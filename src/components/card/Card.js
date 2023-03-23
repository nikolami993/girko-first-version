import "./Card.css";
import {useState} from 'react';
import Share from "../../img/share.svg";
import Comment from "../../img/comment.svg";
import Info from "../../img/info.svg";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";

const Card = ({ post,socket }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification=(type)=>{
    setLiked(true);
    socket.emit("sendNotify",{
      
      receiverName: post.username,
      type
      
    });
  }
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img src={Heart} alt="" className="cardIcon" onClick={()=>handleNotification(1)}/>
        )}

        <img src={Comment} alt="" className="cardIcon" onClick={()=>handleNotification(2)} />
        <img src={Share} alt="" className="cardIcon" onClick={()=>handleNotification(3)} />
        <img src={Info} alt="" className="cardIcon"  />
      </div>
    </div>
  );
};

export default Card;
