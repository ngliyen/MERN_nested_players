import React from 'react';
import './App.css';
import AddPlayer from './views/AddPlayer';
import Dashboard from './views/Dashboard';
import GameStatus from './views/GameStatus';

import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="w-50 container mt-5">
    <BrowserRouter>
      <h3><Link to="/players/list">Manage Players</Link> | <Link to="/status/game/1">Manage Player Status</Link></h3>
      <div className="App">
        <Switch>
          <Route exact path="/players/list">
            <Dashboard />
          </Route>
          <Route path="/players/addplayer">
            <AddPlayer />    
          </Route>
          <Route path="/status/game/:id">
            <GameStatus  />    
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
