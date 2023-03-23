import "./Navbar.css";
import Notify from "../../img/notification.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifies, setNotifies] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // socket.on("getNotify",(message)=>{console.log(message);});
    socket.on("getNotify", (data) => {
      setNotifies((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifies);

  const displayNotifies = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification" key={action}>{`${senderName} ${action} your post`}</span>
    );
  };
  const handlerRead = () => {
    setNotifies([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">GIR KOM</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notify} className="iconImg" alt="" />
          {notifies.length > 0 && (
            <div className="counter">{notifies.length}</div>
          )}
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifies.map((n) => displayNotifies(n))}
          {notifies.length > 0 && (
            <button className="nButton" onClick={handlerRead}>
              Mark as read
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default Navbar;
