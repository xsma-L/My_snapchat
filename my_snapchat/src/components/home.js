import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';


//TODO faire inscription/connection
export class Home extends Component {

  constructor(){
    super()
    this.state = {
      redirect: null
    };
  }

  //TODO faire la redirection en cas d'une conneion dejé présente
  componentDidMount() {
    const tok = localStorage.getItem('token');
    if (tok != null){
      this.setState({
        redirect: true,
      })
    }
  }

    render()  {
      if (this.state.redirect)
      return <Redirect to='/AddPictures'/> 
      return (
        <div className="center2">
          <div className="container2">
            <h2>Snapchat</h2>
            <img src="images/logo.png" alt="Logo snapchat" />
            <div className="align">
              <div className="btn cercle2 rounded-circle btn-primary btn-lg shadow">
                <Link to="/inscription">Inscription</Link>
              </div>
              <br/>
              <div className="btn cercle2 rounded-circle btn-primary btn-lg shadow">
                <Link to="/login">Connexion</Link>
              </div>
            </div>  
            </div>
        </div>
        );
      }
    }

export default Home;