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

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
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
          <Typography variant="h6" color="inherit">
            Olympics Database
          </Typography>
        </Toolbar>
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab label="Trend 1" component={Link} to='/trend1'/>
                    <Tab label="Trend 2" component={Link} to='/trend2'/>
                    <Tab label="Trend 3" component={Link} to='/trend3'/>
                    <Tab label="Trend 4" component={Link} to='/trend4'/>
                    <Tab label="Trend 5" component={Link} to='/trend5'/>                
                </Tabs>
            </AppBar>
            <TabContainer>
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