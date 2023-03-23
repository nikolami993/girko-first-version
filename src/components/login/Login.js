import styles from "../login/Login.module.css";
import LayoutForm from "../layout/LayoutForm";
// import io from 'socket.io-client';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Communication from "../../img/networking.png";
import GIRLogo from "../../img/logo.png";
import AdminForm from "../admin/AdminForm"
import AuthApi from "../../context/AuthApi";
import Cookies from 'js-cookie';
// import argon2 from 'argon2';

const Login = ({ socket }) => {
    const Auth = useContext(AuthApi);
    const [name, setName] = useState([]);
    const [name1, setName1] = useState([]);
    const [count, setCount] = useState(0);
    //   const [socket, setSocket] = useState(null);
    const [response, setResponse] = useState("");
    let navigate = useNavigate();
    let data;



    useEffect(() => {
        const user = Cookies.get("user");
        if (user) {
            navigate('/poruke');
        }
    }, []);
/*
    function reverseFunc() {
        let email = "a@gir.rs";
        let pass = "1234";
        const reverseString = (str) => [...str].reverse().join("");
        let revResult = reverseString(pass) + reverseString(email);
        let buff = new Buffer.from(revResult,'utf-8');
        let base64data = buff.toString('base64').toString("utf-8");
        setName1(base64data.substring(0, 16));
      
        return base64data.substring(0, 16);
      }
      function* hexFormatValues(buffer) {
        for (let x of buffer) {
          const hex = x.toString(16)
          yield hex.padStart(2, '0')
        }
      }
    async function hashit() {

        try {
          console.log("a@gir.rs 1234 "+name1);
      
          const hash = await argon2.hash('1234',{
            type: argon2.argon2i,
            salt: Buffer.from(name1,'utf-8'),
            raw:true,
            parallelism: 1,
            memoryCost: 1024,
            iterations: 3,
            hashLength: 36,
            version: 19,
          });
          console.log(hash);
          let arr=[];
      
          for (const item of hash) {
            arr.push(item)
          }
          const buf = Buffer.from(arr);
          
          console.log(arr);
          let io="";
          for (let hex of hexFormatValues(buf)) {
            io+=hex;
          } 
          console.log("za query -------------  "+ io.toUpperCase())
      
          if (await argon2.verify(hash, "1234")) {
            // password match
            console.log("matched");
          } else {
            // password did not match
            console.log("not matched");
          }
        } catch (err) {
          console.log("ERROR " + err);
        }
        
      
      }
*/
    useEffect(() => {
        if (count > 0) {
            /*
            reverseFunc();
hashit();
*/
            console.log(name);
            socket.emit("login", name, function (dataFromServer) {
                if (dataFromServer === "nok") {
                    console.log(dataFromServer);
                    navigate('/');
                    
                } else if (dataFromServer !== "ok") {
                    Auth.setAuth(true);
                    window.name = dataFromServer.data_id;
                    
                    Cookies.set("user", window.name);
                    console.log(dataFromServer);
                    navigate("/poruke");
                }
            });
            
        }
    }, [socket, name]);

    const emailRef = useRef();
    const passwordRef = useRef();

    const submitHandler = async (event) => {

        event.preventDefault();
        const enterEmail = emailRef.current.value;
        const enterPassword = passwordRef.current.value;

        //   const hash = await argon2.hash(enterPassword, {
        //     type: argon2.argon2d,
        //     memoryCost: 2 ** 16,
        //     hashLength: 50,
        // });

        // console.log(hash);
        

        const userData = {
            email: enterEmail,
            password: enterPassword,
            hashed: false
        };
        setName(userData);
    }
    return (
        <LayoutForm>
            <form className={styles.login} onSubmit={submitHandler} >
                <img src={GIRLogo} className="logoImg" alt="" />
                <h4 className={styles.title}>Prijava na GIRKO</h4>
                {response}
                
                <div className={styles['form-group']}>
                    <input
                        type="text"
                        id="fname"
                        className={styles.passform}
                        name="fname"
                        placeholder="Korisnički e-mail"
                        ref={emailRef}
                    />
                    <input
                        type="password"
                        id="fname"
                        className={styles.passform}
                        name="fname"
                        placeholder="Korisnička šifra"
                        ref={passwordRef}
                    /> 
                    <div className={styles['text-center']}>
                        {/* <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto" onClick={() => setCount(count + 1)}>Prijavi me</button> */}
                        <button type="submit" className={styles.btnLogin} onClick={() => setCount(count + 1)}>Prijavi me</button>
                    </div>
                </div>

            </form>
            <div className={styles.imageform}>
                <img src={Communication} className={styles.windowImg} alt="" />
            </div>


        </LayoutForm>
    );
}
export default Login;
