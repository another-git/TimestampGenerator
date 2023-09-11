import "./DateUI.css";
import { useTimeStampInfoDispatch } from "../../util/TimeStampContext";
import { useEffect } from "react";
export default function DateUI() {
    const dispatch = useTimeStampInfoDispatch();

    const dateChange = (event) => {
        dispatch({
            type: 'setDateTime',
            payload: new Date(event.target.value).valueOf()
        })
    }

    const defaultTime = new Date();

    defaultTime.setMinutes(defaultTime.getMinutes() - defaultTime.getTimezoneOffset());

    return (
        <div className="date-ui-container">
            <input type="datetime-local" className="date-calendar-picker" onChange={dateChange} defaultValue={defaultTime.toJSON().slice(0, 16)}/>
        </div>
    )
}