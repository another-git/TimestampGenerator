import "./RelativeUI.css";
import { useEffect } from 'react';
import { useTimeStampInfo, useTimeStampInfoDispatch } from "../../util/TimeStampContext";
import RelativeTimeInput from "./relativeTimeInput.js";
export default function RelativeUI() {
    const timeStampInfo = useTimeStampInfo();
    const dispatch = useTimeStampInfoDispatch();
    useEffect(() => {
        dispatch({
            type: 'timeTick'
        })
        const interval = setInterval(() => {
            dispatch({
                type: 'timeTick'
            })
        }, 1000);
        return () => clearInterval(interval);
    },[dispatch]);
    const changeCallBack = (field, value) => {
        const timeMapClone = {...timeStampInfo.relativeTime}
        console.log(timeMapClone);
        timeMapClone[field] = value;
        dispatch({
            type: 'setRelativeTime',
            payload: timeMapClone
        })
    }
    const changeButtonCallBack = (field, type) => {
        const timeMapClone = {...timeStampInfo.relativeTime}
        timeMapClone[field] = type === "inc" ? parseInt(timeMapClone[field]) + 1 : parseInt(timeMapClone[field]) - 1;
        dispatch({
            type: 'setRelativeTime',
            payload: timeMapClone
        })
    }
    return (
        <div className="relative-ui-container">
            <div className="relative-weeks-container">
                <RelativeTimeInput timeType="Weeks" time={timeStampInfo.relativeTime["Weeks"]} changeCallBack={changeCallBack} changeButtonCallBack={changeButtonCallBack}/>
            </div>
            <div className="relative-days-container">
                <RelativeTimeInput timeType="Days" time={timeStampInfo.relativeTime["Days"]} changeCallBack={changeCallBack} changeButtonCallBack={changeButtonCallBack}/>
            </div>
            <div className="relative-hours-container">
                <RelativeTimeInput timeType="Hours" time={timeStampInfo.relativeTime["Hours"]} changeCallBack={changeCallBack} changeButtonCallBack={changeButtonCallBack}/>
            </div>
            <div className="relative-minutes-container">
                <RelativeTimeInput timeType="Minutes" time={timeStampInfo.relativeTime["Minutes"]} changeCallBack={changeCallBack} changeButtonCallBack={changeButtonCallBack}/>
            </div>
            <div className="relative-seconds-container">
                <RelativeTimeInput timeType="Seconds" time={timeStampInfo.relativeTime["Seconds"]} changeCallBack={changeCallBack} changeButtonCallBack={changeButtonCallBack}/>
            </div>
        </div>
    )
}