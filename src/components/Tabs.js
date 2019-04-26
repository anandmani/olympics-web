import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Trend1 from "../trends/Trend1";
import Trend2 from "../trends/Trend2";
import Trend3 from "../trends/Trend3";
import Trend4 from "../trends/Trend4";
import Trend5 from "../trends/Trend5";
import HostPerformance from "../trends/HostPerformance";
import CountryTally from "../trends/CountryTally";

import Sports from "../trends/Sports";
import Sport from "../trends/Sport";
import Event from "../trends/Event";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import IndividualTally from '../trends/IndividualTally';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class TrendsTab extends React.Component {
  render() {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            <Button {...bindTrigger(popupState)} style={{color: "white"}}>
              Trends
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close} component={Link} to='/trend1'>Trend 1</MenuItem>
              <MenuItem onClick={popupState.close} component={Link} to='/trend2'>Trend 2</MenuItem>
              <MenuItem onClick={popupState.close} component={Link} to='/trend3'>Trend 3</MenuItem>
              <MenuItem onClick={popupState.close} component={Link} to='/trend4'>Trend 4</MenuItem>
              <MenuItem onClick={popupState.close} component={Link} to='/trend5'>Trend 5</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    )
  }
}
class SimpleTabs extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    console.log("value is", value)
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit">Olympics Database</Typography>
            </Toolbar>
            <Tabs value={value} onChange={this.handleChange} variant="scrollable">
              <Tab label="Home" component={Link} to='/' />
              <Tab label="Country Tally" component={Link} to='/countrytally' />
              <Tab label="Individual Tally" component={Link} to='/individualtally' />
              <Tab label="Host Performance" component={Link} to='/hostperformance' />
              <Tab label="Trends" component={TrendsTab} />
            </Tabs>
          </AppBar>
          <TabContainer>
            <Route exact path="/" component={Sports} />
            <Route exact path="/sport" component={Sport} />
            <Route exact path="/event" component={Event} />
            <Route exact path="/countrytally" component={CountryTally} />
            <Route exact path="/individualtally" component={IndividualTally} />
            <Route exact path="/hostperformance" component={HostPerformance} />
            <Route exact path="/trend1" component={Trend1} />
            <Route exact path="/trend2" component={Trend2} />
            <Route exact path="/trend3" component={Trend3} />
            <Route exact path="/trend4" component={Trend4} />
            <Route exact path="/trend5" component={Trend5} />
          </TabContainer>
        </div>
      </Router>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
