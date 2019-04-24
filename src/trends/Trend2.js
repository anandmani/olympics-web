
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import chroma from "chroma-js"
import geographyObject from "../json/world-50m.json"

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

  const subregions = [
    "Southern Asia",
    "Polynesia",
    "Micronesia",
    "Southern Africa",
    "Central Asia",
    "Melanesia",
    "Western Europe",
    "Central America",
    "Seven seas (open ocean)",
    "Northern Africa",
    "Caribbean",
    "South-Eastern Asia",
    "Eastern Africa",
    "Australia and New Zealand",
    "Eastern Europe",
    "Western Africa",
    "Southern Europe",
    "Eastern Asia",
    "South America",
    "Middle Africa",
    "Antarctica",
    "Northern Europe",
    "Northern America",
    "Western Asia",
  ]

  let arr = [];
class SubregionsMap extends Component {
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]}>
            <Geographies geography={geographyObject}>
              {(geographies, projection) =>
                geographies.map((geography, i) => {
                    // console.log("geography", geography);
                    arr.push({id: geography.id, name: geography.properties.name})
                    return(
                        <Geography
                            key={ i }
                            geography={ geography }
                            projection={ projection }
                            onClick={ this.handleClick }
                            style={{
                            default: {
                                // fill: colorScale[subregions.indexOf(geography.properties.subregion)],
                                fill: "green",
                                stroke: "#607D8B",
                                strokeWidth: 0.75,
                                outline: "none",
                            }
                            }}
                        />
                    )
              })}
            </Geographies>
            {
                console.log("arr", arr)
            }
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default SubregionsMap
