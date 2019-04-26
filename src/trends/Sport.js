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
import { Link } from "react-router-dom";
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

class Sport extends PureComponent {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      data: [],
      filters: {}
    }
  }
  componentDidMount() {
    let sport = queryString.parse(this.props.location.search).name
    fetch(`${url}/sport?name=${encodeURIComponent(sport)}`)
      .then(parseResponse)
      .then(data => this.setState(
        (state, props) => (
          { ...state, data })
      )
    );
  }
  render() {
    let sport = queryString.parse(this.props.location.search).name
    return (
      <div>
        <Breadcrumbs arial-label="Breadcrumb">
          <Typography color="textPrimary">All Sports</Typography>
          <Typography color="textPrimary">{sport}</Typography>
          <Typography color="textSecondary">[Event]</Typography>
        </Breadcrumbs>
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><b>Sport</b></TableCell>
                <TableCell><b>Sport Season</b></TableCell>
                <TableCell><b>Event</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, i) => (
                <TableRow key={i} component={Link} to={`/event?name=${row.EVENT}`} style={{textDecoration: "none"}}>
                  <TableCell component="th" scope="row">
                    {row.SPORT}
                  </TableCell>
                  <TableCell>{row.SPORT_SEASON}</TableCell>
                  <TableCell>{row.EVENT}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Sport);
