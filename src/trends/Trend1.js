import React, {PureComponent} from "react";
import {parseResponse} from '../utils';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend} from "victory"; 

class Trend1 extends PureComponent{
    constructor(props){
        super(props);
        this.state = {data: []}
    }
    componentDidMount(){
        // fetch(`http://localhost:3000/test?id=6157`)
        console.log("fetching");
        fetch(`http://localhost:3000/trend1`)
        .then(parseResponse)
        .then(data => this.setState(
            (state, props) => (
                {...state, data})
            )
        );
      }
    render(){
        return(
            <div style={{height: 600, width: 600}}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    >
                <VictoryAxis label='Year' />
                <VictoryAxis label='Number of participants' dependentAxis={true} />
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    data={this.state.data}
                    x='YEAR'
                    y='COUNT'
                    />
                  <VictoryLegend x={125} y={30}
                    title="Legend"
                    centerTitle
                    orientation="horizontal"
                    gutter={5}
                    style={{ 
                        border: { stroke: "black" }, 
                        title: {fontSize: 10 },
                        labels: {fontSize: 10}
                    }}
                    data={[
                        { name: "Female", symbol: { fill: "#c43a31" } }
                    ]}
                />                            
                </VictoryChart>
            </div>
        )
    }
}

export default Trend1