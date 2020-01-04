import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from "react-webcam";
import axios from 'axios';

// • Un clique sur un bouton permet de choisir une image
// • Une fois la photo prise, la liste des utilisateurs enregistrés doit apparaître.
// • Vous devez sélectionner la personne à qui envoyer l’image, et choisir la durée

export class AddPictures extends Component {
  constructor(){
    super()
    this.state = {
      picture: '',
      list: '',
      time : 0,
      tab: [],
      redirect: null,
      webcam: false
    };
  }

  //TODO récuperer list contact

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.setState({
          redirect: true,
        })
    }
    if(token !== null){
      fetch('http://snapchat.wac.under-wolf.eu/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
            'access-control-allow-origin': '*'
          }
     }).then(res => res.json())
     .then(
       data => {
        localStorage.setItem('tab', JSON.stringify(data.data));
        this.setState({tab : JSON.parse(localStorage.getItem('tab'))});      
      } )       
     .catch(err => console.log(err))
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    var span = document.getElementsByClassName("link")[0];
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc)
    // downloadFile(imageSrc);
    this.setState({
      webcam: false,
    //   // picture: imageSrc
    })
    var a = document.createElement("a"); //Create <a>
    span.innerHTML = a;
    a.href = imageSrc; //Image Base64 Goes here
    a.download = "Image.jpeg"; //File name Here
    a.click();
  }

  

  //TODO déconnection

      deconnection = ()=>{
        localStorage.removeItem('token');
        let token =  localStorage.getItem('token');
        if (token === null) {
            this.setState({
                redirect: true
              })
        };
      }
    
      onChangeHandler = (e) => {
          let file = e.target.files[0];
          console.log(file)
          this.setState({
            picture: file
          })
      }


      change = e => {
          this.setState({
              [e.target.id]: e.target.value
          })
      }

      show= () =>{
        this.setState({
          webcam: true
        })
      }

      //TODO envoyer snap
      
      submit = () => {
        let formData = new FormData(); 
        formData.append('duration', this.state.time);
        formData.append('to', this.state.list);
        formData.append('image', this.state.picture);
        let token = localStorage.getItem('token');
        const config = {     
          headers: { 
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'multipart/form-data',
            'token' : token
         }
      }
      
      axios.post('http://snapchat.wac.under-wolf.eu/snap', formData, config)
       .then(res => {
          { if(res.statusText === "OK"){
          alert('Votre snap a été envoyer')
          }else{
              alert('Veuillez renvoyer votre snap')
          }
        }
       })
       .then(data => console.log(data))       
       .catch(err => console.log(err))
      }

    
  render() {
      if (this.state.redirect)
          return <Redirect to ='/'/>

          let webcam;
          let capture_photo;
      if (this.state.webcam === true){
        webcam = <Webcam 
        style={{width:100+"%", height:100+"%"}}
        audio={false}
        ref={this.setRef} 
        screenshotFormat="image/jpeg"/>

        capture_photo = <button onClick={this.capture}>capture</button>
      } else {
        webcam = <button onClick={this.show}>Prendre une photo</button>
      }
      return(
          <div>
              <div className="container">
                <div className="topnav" id="myTopnav">
              <a href="/GetPictures" className="active deco">Mes message</a>
              <a href="#" className="active msg"><span onClick={this.deconnection}>Déconnexion</span></a>
            </div> 
              <h2>Envoi d'un snap</h2>
              <hr/>
              <div className="webcam_container">
              {webcam}
              {capture_photo}
              </div>
              <div className="link">
              </div>
              <form onSubmit={(e) => {e.preventDefault(); this.submit()}}
              encType="multipart/form-data">
              <input name="picture" type="file" id="picture" onChange={this.onChangeHandler}/>
              <div className="form_show">
                  <select name="contact" id="list" onChange={this.change}>
                  <option value="">--Choisissez un contact--</option>
                  {this.state.tab.length > 0 ?
                   this.state.tab.map((key, value) =>
                    <option key={value} value={key.email}>{key.email}</option>
                  ) : ""
                }
                </select><br/>
                <select name="time" id="time" onChange={this.change}>
                  <option value="">--Choisissez la durée--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <button className="btn cercle rounded-circle btn-primary btn-lg shadow mt-3 float-right" type="submit">Envoyer</button>
              </form>
            </div>
              <div className="center2">
                 <div className="indica">Veuillez selectionner une image/Un destinataire/une durée </div>
              </div>
          </div>
      );
  }
}

export default AddPictures;