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
import queryString from 'query-string';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

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

class Event extends PureComponent {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      data: [],
      filters: {}
    }
  }
  componentDidMount() {
    let event = queryString.parse(this.props.location.search).name
    fetch(`${url}/event?name=${encodeURIComponent(event)}`)
      .then(parseResponse)
      .then(data => this.setState(
        (state, props) => (
          { ...state, data })
      )
      );
  }
  render() {
    let event = queryString.parse(this.props.location.search).name
    return (
      <div>
        <Breadcrumbs arial-label="Breadcrumb">
          <Typography color="textPrimary">All Sports</Typography>
          <Typography color="textPrimary">{event.split(' ')[0]}</Typography>
          <Typography color="textPrimary">{event}</Typography>
        </Breadcrumbs>
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><b>Event</b></TableCell>
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Gold</b></TableCell>
                <TableCell><b>Silver</b></TableCell>
                <TableCell><b>Bronze</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.EVENT}
                  </TableCell>
                  <TableCell>{row.YEAR}</TableCell>
                  <TableCell>{row.GOLDEN}</TableCell>
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

export default withStyles(styles)(Event);
