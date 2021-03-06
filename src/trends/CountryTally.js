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

class CountryTally extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filters: {}
    }
  }
  componentDidMount() {
    fetch(`${url}/countrytally`)
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
        <h1>Medals Tally</h1>
        <p>A record of all the medals won by a country in Summer and Winter games</p>
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><b>Country</b></TableCell>
                <TableCell><b>Gold</b></TableCell>
                <TableCell><b>Silver</b></TableCell>
                <TableCell><b>Bronze</b></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.COUNTRY}
                  </TableCell>
                  <TableCell>{row.GOLD}</TableCell>
                  <TableCell>{row.SILVER}</TableCell>
                  <TableCell>{row.BRONZE}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}



export default withStyles(styles)(CountryTally);
