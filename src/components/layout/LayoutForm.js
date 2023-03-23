import '../layout/LayoutForm.css'

const LayoutForm = (props) => {
    return (
        <div className="containerlog">
            <div className="border">
                {props.children}
            </div>
        </div>
    )
}

export default LayoutForm;