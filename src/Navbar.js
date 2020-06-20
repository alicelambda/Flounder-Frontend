import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { MenuItem } from 'material-ui';
import List from '@material-ui/core/List';
import {
  Link,
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 405,
  },
  media: {
    height: 200,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 70,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(-20),
    paddingBottom: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
  },
}));

function TodoNav(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };




  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >

        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <Link to="/" style={{ textDecoration: 'none' }}><MenuItem>Home</MenuItem></Link>
            <Link to="/stats" style={{ textDecoration: 'none' }}><MenuItem>Stats</MenuItem></Link>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
export default TodoNav