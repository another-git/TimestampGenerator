import "./RelativeTimeInput.css";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

export default function RelativeTimeInput(props) {
    const handleChange = (e) => {
        props.changeCallBack(props.timeType, e.target.value.replace(/\D/g, '') === '' ? 0 : e.target.value.replace(/\D/g, ''));
    }
    const handeClick = (type) => {
        props.changeButtonCallBack(props.timeType, type)
    }
    return (
        <div className="relative-time-input-container">
            <span className="relative-time-label">{props.timeType}</span>
            <div className = "relative-time-field-wrapper">
                <input className="relative-time-input" value={props.time} onChange={handleChange}></input>
            </div>
            <div className = "time-input-button-wrapper">
                <SlArrowUp size="1.5rem" className="time-input-button" onClick={ () => handeClick("inc")}/>
                <SlArrowDown size="1.5rem" className="time-input-button" onClick={() => handeClick("dec")}/>
            </div>
        </div>
    )
}