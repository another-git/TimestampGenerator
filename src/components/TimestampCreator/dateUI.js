import "./DateUI.css";
import { useTimeStampInfoDispatch } from "../../util/TimeStampContext";
import { useEffect, useState } from "react";
export default function DateUI() {
    const dispatch = useTimeStampInfoDispatch();
    const trimmedTime = new Date();
    trimmedTime.setMinutes(trimmedTime.getMinutes() - trimmedTime.getTimezoneOffset());
    const [defaultTime, setDefaultTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: 'setDateTime',
                payload: defaultTime
            })
        }, 1000);
        return () => clearInterval(interval);
    },[dispatch, defaultTime]);

    const dateChange = (event) => {
        const targetTime = new Date(event.target.value).valueOf();
        setDefaultTime(targetTime);
        dispatch({
            type: 'setDateTime',
            payload: targetTime
        })
    }

    return (
        <div className="date-ui-container">
            <input type="datetime-local" className="date-calendar-picker" onChange={dateChange} defaultValue={trimmedTime.toJSON().slice(0, 16)}/>
        </div>
    )
}