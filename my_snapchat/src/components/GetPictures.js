import React, { Component } from 'react';
import '../Get_snap.css';
import { Redirect } from 'react-router-dom';

export class GetPictures extends Component {
    constructor(){
        super()
        this.state = {
          snaps: [],
          modal: null,
          link: null,
          time: null,
          redirect: null
        };
    }
    
    //TODO réecuperer snaps reçus

    componentDidMount() {
        let token =  localStorage.getItem('token');
            if (token === null) {
            this.setState({
                redirect: true
              })
        };
        if(token !== null) {
            fetch('http://snapchat.wac.under-wolf.eu/snaps', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*',
                    'token': token,
                },
           })
           
           .then(res => {
               return res.json()
           })
           .then(data => {
            this.setState({
                snaps: data.data,
                })
           })       
           .catch(err => console.log(err))
        }
    }

    deconnection= ()=>{
        console.log('test')
        localStorage.removeItem('token');
        let token =  localStorage.getItem('token');
        if (token === null) {
            this.setState({
                redirect: true
              })
        };
    }
    
    //TODO convertir buffer en base64

    arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    //TODO afficher le snap

    display(link, id){
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = link;
        let time = this.state.time;
        var span = document.getElementsByClassName("close")[0];   
        var count = time
        var func = this.delete_refresh(id);
        var timer = setInterval(function() {
            count--;
            if (count >= 0) {
                span.innerHTML = count;
            }
            if (count === 0) {
                modal.style.display = "none";
                return (func)
            }
        }, 1000);
        span.onclick = function() { 
        modal.style.display = "none";
        }
    }

    //TODO supprimer le snap qui vient d'être vu et rafraîchir

    delete_refresh(id){
        let token =  localStorage.getItem('token');
        fetch('http://snapchat.wac.under-wolf.eu/seen/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token': token,
            },
            body: JSON.stringify( {
                id: id
            })
        })
       .then(res => res.json())
       .then(data => {
            this.componentDidMount();
        })
        .catch(err => console.log(err))
    }
    
    //TODO récuperer le buffer
    
    send(id) {
        let token =  localStorage.getItem('token');
        fetch('http://snapchat.wac.under-wolf.eu/snap/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*',
                'token': token,
            },
        })
       .then(res => res.json())
       .then(data => {
            var type = data.data.image.contentType;
            let file = data.data.image.data.data;
            var test = this.arrayBufferToBase64(file)
            var base64Flag = 'data:' + type + ";base64, ";
            this.setState({
                link: data.data.image.link,
                time: data.data.duration,
                modal: base64Flag + test 
            })
            this.display(this.state.modal, id)
        })       
        .catch(err => console.log(err))
    }
    
    render() {
        if (this.state.redirect){
            return <Redirect to='/'/>
        }
        let snaps_list;
        let img;
        const numRows = this.state.snaps.length
        if (numRows === 0){
            snaps_list = <h3>Vous n'avez pas encore reçus de snaps</h3>
        } else {
            snaps_list =  <h3>Mes messages</h3>
        }

        if(this.state.link !== null){
            img =<img id="myImg" src={this.state.modal} alt="Snow" style={{width:'100%', maxWidth: 300}} />
        }
        
        return(
            <div>
                <div className="container">
                <div className="topnav" id="myTopnav">
                    <a href="/AddPictures" className="active deco">Evoyer un snap</a>
                    <a href="#" className="active msg"><span onClick={this.deconnection}>Déconnexion</span></a>
                </div>
                        <h2>Receipt photo</h2>
                        <hr/>
                    {snaps_list}
                    {numRows > 0 ?
                        this.state.snaps.map((key, value) =>
                        <span key={value} onClick={ () => this.send(key._id)}>{key.from}<br></br></span>
                        ) : ""
                    }
                </div>
                <div id="myModal" className="modal">
                    <span className="close">{this.state.time}</span>
                    <img className="modal-content" id="img01"/>
                    <div id="caption"></div>
                </div>
                <div className="center2">
                    <div className="indica">Ici vous recevrez vos snaps </div>
                </div>   
            </div>
        );
    }
}

export default GetPictures;