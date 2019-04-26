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
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

const wrapperStyles = {
	width: "100%",
	maxWidth: 980,
	margin: "0 auto",
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


const getColorFromParticipants = (participants) => {
	if (participants > 500) {
		return "#bb5443"
	} else if (participants > 350) {
		return "#ea6a54"
	} else if (participants > 200) {
		return "#ec7865"
	} else if (participants > 100) {
		return "#f09687"
	} else if (participants > 50) {
		return "#f4b4a9"
	} else if (participants > 10) {
		return "#f8d2cb"
	} else if (participants > 0) {
		return "#fcf0ed"
	} else {  //participants is NULL
		return "white"
	}
}

class Trend3 extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			filters: {
				year: 2016
			}
		}
	}
	getColorForCountry = (name) => {
		if (countryMapping[name]) { //If country name differs in oracle db, resolve it
			name = countryMapping[name]
		}
		let data = this.state.data
		if (data[name]) {
			return getColorFromParticipants(data[name].PARTICIPANTS)
		}
		return "white"
	}
	componentDidMount() {
		fetch(`${url}/trend3?year=${this.state.filters.year}`)
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
	handleChange = (event, value) => {
		console.log("value", value);
		const newState = update(this.state, {
			filters: {
				year: {
					$set: value
				}
			}
		});
		this.setState(newState);
	}
	componentDidUpdate(prevProps, prevState) {
		let year = this.state.filters.year
		if (prevState.filters.year != year) {
			fetch(`${url}/trend3?year=${year}`)
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
				<h1>Geographic Participation</h1>
				<p>The rise in number of participants from countries</p>
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
								</ZoomableGroup>
							</ComposableMap>
						</div>
					</div>
					<div style={{ marginLeft: 10, flex: 1 }}>
						<h2>Filters</h2>
						<div style={{width: 200}}>
							<Typography id="label">Year: {this.state.filters.year}</Typography>
							<br />
							<Slider
								value={this.state.filters.year}
								min={1960}
								max={2016}
								step={4}
								onChange={this.handleChange}
							/>
						</div>
						<VictoryLegend x={0} y={0}
							title="Legend - Number of participants"
							centerTitle
							orientation="vertical"
							gutter={10}
							style={{
								data: { stroke: "black", strokeWidth: 1 },
								border: { stroke: "black" },
								title: { fontSize: 20 },
								labels: { fontSize: 20 }
							}}
							data={[
								{ name: "> 500", symbol: { fill: "#bb5443" } },
								{ name: "350 - 500", symbol: { fill: "#ea6a54" } },
								{ name: "200 - 350", symbol: { fill: "#ec7865" } },
								{ name: "100 - 200", symbol: { fill: "#f09687" } },
								{ name: "50 - 100", symbol: { fill: "#f4b4a9" } },
								{ name: "10 - 50", symbol: { fill: "#f8d2cb" } },
								{ name: "< 10", symbol: { fill: "#fcf0ed" } }
							]}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Trend3);