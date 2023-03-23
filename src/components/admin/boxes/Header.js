export default function Header(props) {
    return (
        <div>
            <div className={props.style}>
              {props.image ? <img src={props.image} className={props.imageStyle} alt="" /> : null} 
              <h3>{props.title}</h3> 
            </div>
        </div>
    )
}