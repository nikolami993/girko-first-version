import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/register/Register'
import Login from "./components/login/Login";
import AdminForm from "./components/admin/AdminForm";
import io from "socket.io-client";
import Post from "./components/admin/posts/Post";
import AddPost from "./components/admin/posts/AddPost";
import Sidebar from "./components/navbar/Sidebar";
import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Cookies from 'js-cookie';
import AuthApi from "./context/AuthApi";
import Questionnaire from "./components/admin/questions/Questionnaire";
import AddQuestionnaire from "./components/admin/questions/AddQuestionnaire";
import ReviewQuestion from "./components/review/ReviewQuestion";
import User from "./components/users/User";
import ReUser from "./components/users/ReUser";
import Group from "./components/admin/groups/Group";
import CreateGroup from "./components/admin/groups/CreateGroup";
import CreateSurvey from "./components/admin/survey/CreateSurvey";
export const socket = io.connect(process.env.REACT_APP_BASE_URL);
// 10.58.156.252
// const socket = io.connect("http://girkv229.gir.local:8080");
// const socket = io.connect("http://girkv229:8080");
function App() {
   
   const [auth, setAuth] = useState(false);
   const [user, setUser] = useState("");
 
   const readCookie = () => {
      const user = Cookies.get("user");
      if (user) {
         setAuth(true);
      }
   }
   
   useEffect(() => {
      readCookie();
   }, []);

   return (
      <div>
         <AuthApi.Provider value={{ auth, setAuth }}>

            <Router>
               <Routes>
                  <Route path="/" element={<Login socket={socket} />} />
                  <Route path="/register" element={<Register socket={socket} />} />
                  <Route path="/kreiranje_grupe" element={<AdminForm socket={socket} />} />
                  <Route path="/ccc" element={<CreateGroup />} />
                  <Route path="/xxx" element={<CreateSurvey socket={socket} />} />
                  <Route path="/pregled_grupe" element={<Group socket={socket} />} />
                  <Route path="/poruke" element={<Post socket={socket} />} />
                  <Route path="/kreiranje_poruke" element={<AddPost socket={socket} />} />
                  <Route path="/meni_bar" element={<Sidebar socket={socket} />} />
                  <Route path="/chat" element={<Chat socket={socket} />} />
                  <Route path="/napravi_anketu" element={<Questionnaire socket={socket} />} />
                  <Route path="/dodeli_anketu" element={<AddQuestionnaire socket={socket} />} />
                  <Route path="/anketa/:id" element={<ReviewQuestion socket={socket} />} />
                  <Route path="/odgovor_anketa" element={<AddQuestionnaire socket={socket} />} />
                  <Route path="/verify/:id" element={<User socket={socket}/>} />
                  <Route path="/reverify/:id" element={<ReUser socket={socket}/>} />
               </Routes>
            </Router>

         </AuthApi.Provider>
      </div>
   );
}

export default App;
