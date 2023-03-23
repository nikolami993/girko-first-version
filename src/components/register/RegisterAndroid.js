import '../../components/register/RegisterAndroid.css'
import GIRLogo from "../../img/logo.png"
import Communication from "../../img/networking.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const RegisterAndroid = () =>{

    return (
        <div className="content">
        <div className="box">
     <div className="containerlog">
       <img src={GIRLogo} className="logoImg" alt="" />
       <h5 className="title">Registracija na GIR Kom</h5>
         <form>
             <input type="text" name="uname" id="uname" placeholder="Ime" className="input-box"></input>
             <input type="text" name="uname" id="uname" placeholder="Prezime" className="input-box"></input>
             <input type="email" name="uname" id="uname" placeholder="E-mail" className="input-box"></input>
             <input type="password" name="uname" id="uname" placeholder="Šifra" className="input-box"></input>
             <input type="password" name="uname" id="uname" placeholder="Potvrda šifre" className="input-box"></input>
             <button type="submit" class="btn">Prijava</button>
             <div className="forget">
             <label class="fg">
                    <a href="#">Već imate nalog! Prijavite se</a>
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
export default RegisterAndroid;