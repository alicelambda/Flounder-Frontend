import React from 'react';
import TodoNav from './Navbar';
import Todo from './Todo/Todo';
import Login from './Login';
import Reward from './Reward/Reward'
import Stats from './Stats/Stats'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  const [cookie, setCookie] = React.useState("");
    

  
  React.useEffect(() => {
    setCookie(localStorage.getItem('cookie') || "")
  },[]);

  if(cookie === "") {
    return (
      <Login setCookie={setCookie}/>
    )
  }

  return (
	  <MuiThemeProvider>
      <Router>
	    <div>
      <TodoNav/>
      
      <Switch>
        <Route path="/stats">
          <Stats cookie={cookie}/>
        </Route>
  
        <Route path="/reward">
          <Reward cookie={cookie}/>
        </Route>
        <Route path="/">
          <Todo cookie={cookie}/>
        </Route>
      </Switch>
      </div>
      </Router>
    </MuiThemeProvider>
  )
}

export default App;

