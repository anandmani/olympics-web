import React, {PureComponent} from "react";
import update from 'immutability-helper';
import {VictoryLine, VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis, VictoryLegend} from "victory";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
                game_season: 'Summer',
                sport: 'all'
            }
        }
    }
    componentDidMount(){
        const {game_season, sport} = this.state.filters
        fetch(`${url}/trend1?game_season=${game_season}&sport=${sport}`)
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
                game_season : {
                    $set: event.target.value
                }
            }
        });
        this.setState(newState);
    }
    componentDidUpdate(prevProps, prevState){
        const {game_season, sport} = this.state.filters
        let haveFiltersChanged = (prevState.filters.game_season != game_season) || (prevState.filters.sport != sport)
        if(haveFiltersChanged){
            fetch(`${url}/trend1?game_season=${game_season}&sport=${sport}`)
            .then(parseResponse)
            .then(data => this.setState(
                (state, props) => (
                    {...state, data})
                )
            );
        }

    }
    render(){
        return(
            <div>
                <h1>Trend 1 - Rise in Female Participation</h1>
                <p>Plot comparing male and female participation</p>
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
                                label='Number of participants'
                                dependentAxis={true}
                                style={{
                                    axisLabel: {fontSize: 10, padding: 35},
                                    tickLabels: {fontSize: 8, padding: 5}
                                }}
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#2EC4B6" },
                                    parent: { border: "1px solid #ccc"}
                                }}
                                size={2}
                                data={this.state.data}
                                x='YEAR'
                                y='MALE_ATHLETES'
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#2EC4B6", strokeWidth: 1 },
                                    parent: { border: "1px solid #ccc"}
                                }}
                                data={this.state.data}
                                x='YEAR'
                                y='MALE_ATHLETES'
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#E71D36"},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                size={2}
                                data={this.state.data}
                                x='YEAR'
                                y='FEMALE_ATHLETES'
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#E71D36", strokeWidth: 1},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                data={this.state.data}
                                x='YEAR'
                                y='FEMALE_ATHLETES'
                            />
                            <VictoryLegend x={125} y={10}
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
                                    { name: "Male", symbol: { fill: "#2EC4B6" } },
                                    { name: "Female", symbol: { fill: "#E71D36" } }
                                ]}
                            />
                        </VictoryChart>
                    </div>
                    <div style={{marginLeft: 10, flex: 1}}>
                        <h2>Filters</h2>
                        <FormControl component="fieldset"
                        // className={classes.formControl}
                        >
                            <FormLabel component="legend">Game Season</FormLabel>
                            <RadioGroup
                                aria-label="Game Season"
                                name="game_season"
                                // className={classes.group}
                                value={this.state.filters.game_season}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="Summer" control={<Radio />} label="Summer" />
                                <FormControlLabel value="Winter" control={<Radio />} label="Winter" />
                            </RadioGroup>
                            <br />
                            <br />
                            <Select
                                value={this.state.age}
                                onChange={this.handleChange}
                                inputProps={{
                                name: 'age',
                                id: 'age-simple',
                                }}
                            >
                                <MenuItem value={10}>All sports</MenuItem>
                                <MenuItem value={20}>One</MenuItem>
                                <MenuItem value={30}>Two</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Trend1);
