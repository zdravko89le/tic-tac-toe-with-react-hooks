import React from "react";
import "./App.css";
// import classes from './App.css';

import Layout from "./component/Layout/Layout";
import Game from "./container/Game/Game";
import { PlayersInfo } from "./container/PlayersInfo/PlayersInfo";

const App = () => {

  return (
    <div className="App">
      <Layout>
        <Game />
      </Layout>
    </div>
  );
};

export default App;
