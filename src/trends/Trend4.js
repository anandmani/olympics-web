import React, { PureComponent } from "react";
import update from 'immutability-helper';
import { VictoryLine, VictoryScatter, VictoryTooltip, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend } from "victory";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { parseResponse, url } from '../utils';
import FormGroup from '@material-ui/core/FormGroup';

const sports = { 
  Badminton: {
    color: "#d46f4d"
  },
  Swimming: {
    color: "#00353f"
  },
  Boxing: {
    color: "#08c5d1"
  },
  Athletics: {
    color: "#ffbf66"
  },
  Tennis: {
    color: "#d5b388"
  }
}

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

class Trend4 extends PureComponent {

  constructor(props) {
    super(props);
    let filters = {}
    Object.keys(sports).forEach(sport => { filters[sport] = true })
    this.state = {
      data: [],
      filters
    }
  }

  componentDidMount() {
    let sports = ""
    for (const [key, value] of Object.entries(this.state.filters)) {
      if (value == true) {
        sports += ("sport=" + key + "&")
      }
    }
    sports = sports.substring(0, sports.length - 1)
    fetch(`${url}/trend4?${sports}`)
      .then(parseResponse)
      .then(data => this.setState(
        (state, props) => (
          { ...state, data })
      )
    );
  }

  handleChange = name => event => {
    const newState = update(this.state, {
      filters: {
        [name]: {
          $set: event.target.checked
        }
      }
    });
    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    let didFiltersChange = false
    for(let sport in prevState.filters){
      if(prevState.filters[sport] != this.state.filters[sport]){
        didFiltersChange = true
      }
    }
    if(didFiltersChange){
      let sports = ""
      for (const [key, value] of Object.entries(this.state.filters)) {
        if (value == true) {
          sports += ("sport=" + key + "&")
        }
      }
      fetch(`${url}/trend4?${sports}`)
        .then(parseResponse)
        .then(data => this.setState(
          (state, props) => (
            { ...state, data })
        )
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Trend 4 - Athlete Physique</h1>
        <p>Graph shows the average height of athletes in each sport over the years</p>
        <div style={{ display: "flex" }}>
          <div style={{ height: 600, width: 600 }}>
            <VictoryChart theme={VictoryTheme.material} >
              <VictoryAxis
                label='Year'
                style={{
                  axisLabel: { fontSize: 10, padding: 25 },
                  tickLabels: { fontSize: 8, padding: 5 }
                }}
              />
              <VictoryAxis
                label='Height'
                dependentAxis={true}
                style={{
                  axisLabel: { fontSize: 10, padding: 35 },
                  tickLabels: { fontSize: 8, padding: 5 }
                }}
              />
              <VictoryScatter
                style={{
                  data: { fill: (datum) => sports[datum.SPORT].color },
                  parent: { border: "1px solid #ccc" }
                }}
                size={3}
                labels={(d) => d.AVERAGE_HEIGHT}
                labelComponent={<VictoryTooltip />}
                data={this.state.data}
                x='YEAR'
                y='AVERAGE_HEIGHT'
              />
              <VictoryLegend x={50} y={2}
                title="Legend"
                centerTitle
                orientation="horizontal"
                gutter={10}
                style={{
                  border: { stroke: "black" },
                  title: { fontSize: 8 },
                  labels: { fontSize: 8 }
                }}
                data={
                  Object.keys(sports).map(sport => ({
                    name: sport, 
                    symbol: {fill: sports[sport].color}
                  }))
                  }
              />
            </VictoryChart>
          </div>
          <div style={{ marginLeft: 10, flex: 1 }}>
            <h2>Filters</h2>
            <FormControl component="fieldset" >
              <FormLabel component="legend">Sports:</FormLabel>
              <FormGroup>
                {
                  Object.keys(sports).map(sport => (
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={this.state.filters[sport]} 
                          onChange={this.handleChange(sport)} 
                          value={sport} 
                        />
                      }
                      label={sport}
                    />
                  ))
                }
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Trend4);
