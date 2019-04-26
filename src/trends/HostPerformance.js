import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { parseResponse, url } from '../utils';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class HostPerformance extends PureComponent {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      data: [],
      filters: {}
    }
  }
  componentDidMount() {
    fetch(`${url}/trend5`)
      .then(parseResponse)
      .then(data => this.setState(
        (state, props) => (
          { ...state, data })
      )
      );

  }
  render() {
    return (
      <div>
        <h1>Performance of host country</h1>
        <p>Record of percentage of medals was won by the host country</p>
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><b>Game No.</b></TableCell>
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Country</b></TableCell>
                <TableCell><b>Gold</b></TableCell>
                <TableCell><b>Gold Percentage</b></TableCell>
                <TableCell><b>Silver</b></TableCell>
                <TableCell><b>Silver Percentage</b></TableCell>
                <TableCell><b>Bronze</b></TableCell>
                <TableCell><b>Bronze Percentage</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.GAME}
                  </TableCell>
                  <TableCell>{row.YEAR}</TableCell>
                  <TableCell>{row.HOST}</TableCell>
                  <TableCell>{row.GOLD}</TableCell>
                  <TableCell>{row.GOLD_PERCENTAGE.toFixed(2)}</TableCell>
                  <TableCell>{row.SILVER}</TableCell>
                  <TableCell>{row.SILVER_PERCENTAGE.toFixed(2)}</TableCell>
                  <TableCell>{row.BRONZE}</TableCell>
                  <TableCell>{row.BRONZE_PERCENTAGE.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}



export default withStyles(styles)(HostPerformance);
