import React, { PureComponent } from "react";
import update from 'immutability-helper';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend } from "victory";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { parseResponse, url, countryMapping } from '../utils';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Annotations,
  Annotation,
} from "react-simple-maps"
import chroma from "chroma-js"
import geographyObject from "../json/world-50m.json"
import countryCentres from "../json/countryCentres"

const summerGamesYears = [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988, 1984, 1980, 1976, 1972, 1968, 1964, 1960]

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const colorScale = chroma
  .scale([
    '#FF6E40',
    'FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(24)

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const getColorFromPCI = (pci) => {
  if (pci > 25000) {
    return "#275379"
  } else if (pci > 15000) {
    return "#346fa1"
  } else if (pci > 5000) {
    return "#428bca"
  } else if (pci > 1000) {
    return "#67a2d4"
  } else if (pci > 0) {
    return "#a0c5e4"
  } else {  //pci is NULL
    return "white"
  }
}

const centreCoordinatesOfCountry = (geography) => {
  let coordinates
  if (geography.geometry.type == "MultiPolygon") {
    let numberOfPolygons = geography.geometry.coordinates.length
    coordinates = geography.geometry.coordinates[numberOfPolygons-1][0]
  } else { //polygon
    coordinates = geography.geometry.coordinates[0]
  }
  let minX = coordinates[0][0]
  let maxX = coordinates[0][0]
  let minY = coordinates[0][1]
  let maxY = coordinates[0][1]
  coordinates.forEach(coordinate => {
    minX = coordinate[0] < minX ? coordinate[0] : minX;
    maxX = coordinate[0] > maxX ? coordinate[0] : maxX;
    minY = coordinate[1] < minY ? coordinate[1] : minY;
    maxY = coordinate[1] > maxY ? coordinate[1] : maxY;
  })
  let centreX = (minX + maxX) / 2
  let centreY = (minY + maxY) / 2
  return [centreX, centreY]
}

class Trend2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      filters: {
        year: 2016
      }
    }
  }
  getPerformanceForCountry = (name) => {
    if (countryMapping[name]) { //If country name differs in oracle db, resolve it
      name = countryMapping[name]
    }
    let data = this.state.data
    if (data[name]) {
      return parseFloat(data[name].PERFORMANCE).toFixed(2);
    }
    return null
  }
  getColorForCountry = (name) => {
    if (countryMapping[name]) { //If country name differs in oracle db, resolve it
      name = countryMapping[name]
    }
    let data = this.state.data
    if (data[name]) {
      return getColorFromPCI(data[name].PER_CAPITA_INCOME)
    }
    return "white"
  }
  componentDidMount() {
    fetch(`${url}/trend2?year=${this.state.filters.year}`)
      .then(parseResponse)
      .then(data => {
        let stateData = {}
        data.forEach(obj => {
          stateData[obj.COUNTRY] = obj
        })
        this.setState(
          (state, props) => (
            { ...state, data: stateData })
        )
      });
  }
  handleChange = (event) => {
    const newState = update(this.state, {
      filters: {
        year: {
          $set: event.target.value
        }
      }
    });
    this.setState(newState);
  }
  componentDidUpdate(prevProps, prevState) {
    let year = this.state.filters.year
    if (prevState.filters.year != year) {
      fetch(`${url}/trend2?year=${year}`)
        .then(parseResponse)
        .then(data => {
          let stateData = {}
          data.forEach(obj => {
            stateData[obj.COUNTRY] = obj
          })
          this.setState(
            (state, props) => (
              { ...state, data: stateData })
          )
        });
    }
  }
  render() {
    return (
      <div>
        <h1>Performance of weathly countries</h1>
        <p>The numbers represent the number of participants required to win a medal</p>
        <div style={{ display: "flex" }}>
          <div style={{ width: 1100 }}>
            <div style={wrapperStyles}>
              <ComposableMap
                projectionConfig={{
                  scale: 205,
                  rotation: [-11, 0, 0],
                }}
                width={980}
                height={551}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              >
                <ZoomableGroup center={[0, 20]}>
                  <Geographies geography={geographyObject} disableOptimization>
                    {(geographies, projection) =>
                      geographies.map((geography, i) => {
                        return (
                          <Geography
                            key={i}
                            geography={geography}
                            projection={projection}
                            onClick={this.handleClick}
                            style={{
                              default: {
                                fill: this.getColorForCountry(geography.properties.name),
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none",
                              },
                              hover: {
                                fill: this.getColorForCountry(geography.properties.name),
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none",
                              }
                            }}
                          />
                        )
                      })}
                  </Geographies>
                  <Annotations>
                    {
                      countryCentres.map((annotation, i) => {
                        let performance = this.getPerformanceForCountry(annotation.label)
                        return performance?
                          <Annotation
                            dx={0}
                            dy={0}
                            subject={annotation.coordinates}
                            strokeWidth={0.1}
                            stroke="#607D8B"
                            style={
                              {fontSize: 4}
                            }
                          >
                            <text>{`${this.getPerformanceForCountry(annotation.label) }`}</text>
                          </Annotation>
                          :
                          null
                      }
                      )
                    }
                  </Annotations>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </div>
          <div style={{ marginLeft: 10, flex: 1 }}>
            <h2>Filters</h2>
            <FormControl component="fieldset"
            // className={classes.formControl}
            >
              <FormLabel component="legend">Game Season</FormLabel>
              <Select
                value={this.state.filters.year}
                onChange={this.handleChange}
              >
                {
                  summerGamesYears.map(year => <MenuItem value={year}>{year}</MenuItem>)
                }
              </Select>
            </FormControl>
            <VictoryLegend x={0} y={0}
                title="Legend - Per Capita Income"
                centerTitle
                orientation="vertical"
                gutter={10}
                style={{ 
                    data: { stroke: "black", strokeWidth: 1 },
                    border: { stroke: "black" }, 
                    title: {fontSize: 20 },
                    labels: {fontSize: 20}
                }}
                data={[
                    { name: "> $25,000", symbol: { fill: "#275379" } },
                    { name: "$15,000 - $25,000", symbol: { fill: "#346fa1" } },
                    { name: "$5,000 - $15,000", symbol: { fill: "#428bca" } },
                    { name: "$1,000 - $5,000", symbol: { fill: "#67a2d4" } },
                    { name: "$0 - $1,000", symbol: { fill: "#a0c5e4" } },
                    { name: "Unavailable", symbol: { fill: "white" } }
                ]}
            />        
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Trend2);