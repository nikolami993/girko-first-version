import "../login/LoginAndroid.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data.js";
import io from 'socket.io-client';
import GIRLogo from "./img/logo.png";
import Communication from "./img/networking.png";


function App() {
  
  return (
    <div className="content">
       <div class="box">
    <div className="containerlog">
      <img src={GIRLogo} className="logoImg" alt="" />
      <h5 className="title">Prijava na GIR Kom</h5>
        <form action="#" method="post">
            <input type="text" name="uname" id="uname" placeholder="Korisničko ime" class="input-box"></input>
            <input type="password" name="uname" id="uname" placeholder="Korisnička šifra" class="input-box"></input>
            <div class="forget">
                <label class="checkbox-label">
                    <input type="checkbox"></input>
                    <span class="checkbox-custom"></span>
                    <span class="label-text">Zapamti me</span>
                </label>
                
            </div>
            <button type="submit" class="btn">Prijava</button>
            <div className="forget">
            <label class="fg">
                   <a href="#">Nemate nalog? Registrujte se</a>
            </label>
            </div>
        </form>
      </div>
      <div className="imageform">
      <img src={Communication} className="windowImg" alt="" />
      </div>
  </div>
    </div>
 
    
  );
}
export default App;
