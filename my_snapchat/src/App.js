import React from 'react';
import {Register} from './components/Register';
import {Login} from './components/Login';
import {Home} from './components/home';
import {AddPictures} from './components/AddPictures';
import {GetPictures} from './components/GetPictures';
import logo from './logo.svg';
import './App.css';
import './media-queries.css';
import { register } from './serviceWorker';
import { BrowserRouter, Route, Link } from "react-router-dom";


function App() { 
  return (
    //TODO faire les routes
    <BrowserRouter>
        {/* <div className="main-route-place"> */}
          <Route exact path="/" component={Home} />
          <Route path="/inscription" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/AddPictures" component={AddPictures} />
          <Route path="/GetPictures" component={GetPictures} />
          {/* <hr />
        </div> */}
      </BrowserRouter>
  );
}
     
export default App;
