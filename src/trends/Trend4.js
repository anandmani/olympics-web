import React, {PureComponent} from "react";
import update from 'immutability-helper';
import {VictoryLine, VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend} from "victory";
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
import {parseResponse, url} from '../utils';

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

class Trend1 extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
          data: [],
          filters:{
              'Boxing': true,
              'Swimming': true,
              'Badminton': true,
              'Athletics': true,
              'Tennis': true
          }
        }
    }
    componentDidMount(){
        let sports = ""
        for(const [key, value] of Object.entries(this.state.filters)){
          if(value == true){
            sports += ("sport=" + key + "&")
          }
        }
        sports = sports.substring(0, sports.length - 1)
        fetch(`${url}/trend4?${sports}`)
        .then(parseResponse)
        .then(data => this.setState(
            (state, props) => (
                {...state, data})
            )
        );
    }
    handleChange = (event) => {
        const newState = update(this.state, {
            filters: {
                sport : {
                    $set: event.target.value
                }
            }
        });
        this.setState(newState);
    }
    componentDidUpdate(prevProps, prevState){
        let sports = ""
        for(const [key, value] of Object.entries(this.state.filters)){
          if(value == true){
            sports += ("sport=" + key + "&")
          }
        }
        const {sport} = this.state.filters
        let haveFiltersChanged = (prevState.filters.sport != sport)
        if(haveFiltersChanged){
            fetch(`${url}/trend4?${sports}`)
            .then(parseResponse)
            .then(data => this.setState(
                (state, props) => (
                    {...state, data})
                )
            );
        }

    }
    render(){
      const sports_colors = {
        "Badminton": "#d46f4d",
        "Swimming": "#00353f",
        "Boxing": "#08c5d1",
        "Athletics": "#ffbf66",
        "Tennis":"#d5b388"
      }
        return(
            <div>
                <h1>Athlete Physique</h1>
                <div style={{display: "flex"}}>
                    <div style={{height: 600, width: 600}}>
                        <VictoryChart theme={VictoryTheme.material} >
                            <VictoryAxis
                                label='Year'
                                style={{
                                    axisLabel: {fontSize: 10, padding: 25},
                                    tickLabels: {fontSize: 8, padding: 5}
                                }}
                            />
                            <VictoryAxis
                                label='Height'
                                dependentAxis = {true}
                                style={{
                                    axisLabel: {fontSize: 10, padding: 35},
                                    tickLabels: {fontSize: 8, padding: 5}
                                }}
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: (datum) => sports_colors[datum.SPORT]},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                size={3}
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
                                    title: {fontSize: 8 },
                                    labels: {fontSize: 8}
                                }}
                                data={[
                                    { name: "Badminton", symbol: { fill: sports_colors["Badminton"] } },
                                    { name: "Tennis", symbol: { fill: sports_colors["Tennis"] }},
                                    { name: "Swimming", symbol: { fill: sports_colors["Swimming"] }},
                                    { name: "Boxing", symbol: { fill: sports_colors["Boxing"] }},
                                    { name: "Athletics", symbol: { fill: sports_colors["Athletics"] }
                                   }
                                ]}
                            />
                        </VictoryChart>
                    </div>
                    <div style={{marginLeft: 10, flex: 1}}>
                        <h2>Filters</h2>

                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Trend1);
