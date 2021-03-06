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
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

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

class Sports extends PureComponent {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      data: [],
      filters: {}
    }
  }
  componentDidMount() {
    fetch(`${url}/sports`)
      .then(parseResponse)
      .then(data => this.setState(
        (state, props) => (
          { ...state, data })
      )
    );
  }
  handleRowsCheck = () => {
    fetch(`${url}/check100k`)
      .then(parseResponse)
      .then(data => alert(`Count of rows in pariticipant table: ${formatNumber(data[0].COUNT)}`));
  }
  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleRowsCheck}>
          Check 100k tuples
          </Button>
        <br />
        <br />
        <Breadcrumbs arial-label="Breadcrumb">
          <Typography color="textPrimary">All Sports</Typography>
          <Typography color="textSecondary">[Sport]</Typography>
          <Typography color="textSecondary">[Event]</Typography>
        </Breadcrumbs>

        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell><b>Sport</b></TableCell>
                <TableCell><b>Season</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, i) => (
                <TableRow key={i} component={Link} to={`/sport?name=${row.SPORT}`} style={{ textDecoration: "none" }}>
                  <TableCell component="th" scope="row">
                    {row.SPORT}
                  </TableCell>
                  <TableCell>{row.SPORT_SEASON}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}



export default withStyles(styles)(Sports);
