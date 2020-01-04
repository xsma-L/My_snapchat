
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
    
    state = {
        email: null,
        password: null,
        redirect:false
    };
    
    change = e => {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
        
    submit = e => {
        e.preventDefault();
        fetch('http://snapchat.wac.under-wolf.eu/connection', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           body: JSON.stringify( {
            email :this.state.email,
            password: this.state.password
        })
       }).then(res => res.json())
       .then(
           data =>
          {
            if(data.message === "Wrong Password") {
                alert("Mauvais mot de passe")
            } else if(data.message === "User not found") {
                alert("Veuillez vérifier votre email")
            } else {
               var token = data.data.token
               localStorage.setItem('token', token);
                this.setState({redirect:true})
            }
          }
       )       
       .catch(err => console.log(err)
       )}

    render() {
        if (this.state.redirect)
            return <Redirect to='/AddPictures' /> 
        return(
            <div>
                <form onSubmit={this.submit}>
                <div className="container">
                        <div className="ali">
                            <h2>Connexion</h2>
                            <hr />     
                            <div className="lilogo"><img src="images/lilogo.png" alt="logo" /></div>
                        </div>
                        <br/>
                        <label htmlFor ="email">Email:</label>
                        <input type="text" id="email" onChange={this.change}/>
                        <br/>
                        <label htmlFor ="password">password:</label>
                        <input type="password" id="password" onChange={this.change}/>
                        <br/>
                        <button className="btn cercle rounded-circle btn-primary btn-lg shadow mt-3 float-right" onClick={this._onPressButton}>Envoyer</button>
                    </div>
                </form>
                <div className="center">
                <div className="indica"><p>Veuillez renseigner les champs du formulaire<br /> afin de vous connectez</p></div>
                </div>
            </div>
        );
    }
}

export default Login;
