import React, {PureComponent} from "react";
import update from 'immutability-helper';
import {VictoryLine, VictoryChart, VictoryLabel, VictoryScatter, VictoryTooltip, VictoryTheme, VictoryAxis, VictoryLegend} from "victory";
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

class Trend5 extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            filters:{
            }
        }
    }
    componentDidMount(){
        const {game_season, sport} = this.state.filters
        fetch(`${url}/trend5`)

        .then(parseResponse)
        .then(data => this.setState(
            (state, props) => (
                {...state, data})
            )
        );
    }


    render(){
      console.log(this.state.data);
        return(
            <div>
                <h1>Trend 5 - Performance of host country</h1>
                <p>Graph shows what percentage of medals was won by the host country</p>
                <div>
                    <div>
                        <VictoryChart height= {430} width= {1000} >
                            <VictoryAxis
                                label='Year'
                                style={{
                                    axisLabel: {fontSize: 10, padding: 25},
                                    tickLabels: {fontSize: 8, padding: 5}
                                }}
                            />
                            <VictoryAxis
                                label='Percentage of medals'
                                dependentAxis={true}
                                style={{
                                    axisLabel: {fontSize: 10, padding: 35},
                                    tickLabels: {fontSize: 8, padding: 5}
                                }}
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#C9B037" },
                                    parent: { border: "1px solid #ccc"}
                                }}
                                size={4}
                                data={this.state.data}
                                x='YEAR'
                                y='GOLD_PERCENTAGE'
                                labels={(d) => d.HOST}
                                labelComponent={<VictoryTooltip/>}
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#C9B037", strokeWidth: 1 },
                                    parent: { border: "1px solid #ccc"}
                                }}
                                data={this.state.data}
                                x='YEAR'
                                y='GOLD_PERCENTAGE'
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#B4B4B4"},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                size={4}
                                data={this.state.data}
                                x='YEAR'
                                y='SILVER_PERCENTAGE'
                                labels={(d) => d.HOST}
                                labelComponent={<VictoryTooltip/>}
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#B4B4B4", strokeWidth: 1},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                data={this.state.data}
                                x='YEAR'
                                y='SILVER_PERCENTAGE'
                            />
                            <VictoryScatter
                                style={{
                                    data: { fill: "#AD8A56"},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                size={4}
                                data={this.state.data}
                                x='YEAR'
                                y='BRONZE_PERCENTAGE'
                                labels={(d) => d.HOST}
                                labelComponent={<VictoryTooltip/>}
                            />
                            <VictoryLine
                                style={{
                                    data: { stroke: "#AD8A56", strokeWidth: 1},
                                    parent: { border: "1px solid #ccc"}
                                }}
                                data={this.state.data}
                                x='YEAR'
                                y='BRONZE_PERCENTAGE'
                            />
                            <VictoryLegend x={250} y={10}
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
                                    { name: "Gold", symbol: { fill: "#C9B037" } },
                                    { name: "Silver", symbol: { fill: "#B4B4B4" } },
                                    { name: "Bronze", symbol: { fill: "#AD8A56" } }
                                ]}
                            />
                        </VictoryChart>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Trend5);
