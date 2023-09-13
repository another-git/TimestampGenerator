import "./TimestampCreator.css"
import { useRef, useState } from "react";
import { useTimeStampInfo, useTimeStampInfoDispatch } from "../../util/TimeStampContext";
import RelativeUI from "./relativeUI.js";
import DateUI from "./dateUI.js";
import { LuClipboardCopy } from "react-icons/lu"
import { HiOutlineChevronRight } from "react-icons/hi"
export default function TimestampCreator(props) {
    const modes = document.getElementsByClassName("creation-mode-option");
    const formatList = ["Relative", "Time", "Long Time", "Date", "Long Date", "Date Time", "Date Weekday"]
    const formatSuffix = {"Relative":"R", "Time":"t", "Long Time":"T", "Date":"d", "Long Date":"D", "Date Time":"f", "Date Weekday":"F"}
    const modeList = ["Relative", "Date"]
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const timeStampInfo = useTimeStampInfo();
    const dispatch = useTimeStampInfoDispatch();
    const selectMode = (selected) => {
        let reset = selected === 0 ? 1 : 0
        modes[selected].className = "creation-mode-option selected"
        modes[reset].className = "creation-mode-option"
        props.creationModeCallBack(modeList[selected]);
    }

    const selectFormat = (option) => {
        dispatch({
            type: 'setFormat',
            payload: option
        })
    }

    const timeCallBack = (relative) => {
        console.log(relative);
        props.timeChangeCallBack(Date.now() + relative);
    }

    return (
        <div className="timestamp-creator-container">
            <div className="timestamp-mode-selector-container">
                <h2>Creation Mode : </h2>
                <div className="creation-mode-toggle">
                    <span className="creation-mode-option selected" onClick={ () => selectMode(0)}>Relative</span>
                    <span className="creation-mode-option" onClick={ () => selectMode(1)}>Date/Time</span>
                </div>
            </div>
            {props.creationMode === "Relative" ? <RelativeUI timeCallBack={timeCallBack}/> : <DateUI />}
            <div className="generated-message-container">
                <div className="generated-message-box">
                    <span className="generated-timestamp">{`<t:${Math.floor(timeStampInfo.targetTime/1000)}:${formatSuffix[timeStampInfo.format]}>`}</span>
                </div>
                <div className="copy-button" onClick={ () => {navigator.clipboard.writeText(`<t:${Math.floor(timeStampInfo.targetTime/1000)}:${formatSuffix[timeStampInfo.format]}>`)}}>
                    <LuClipboardCopy size="36px"/>
                </div>
            </div>
            <div className="timestamp-format-selector-container" onClick = { () => {
                setOpen(!open);
            }}>
                <div className="timestamp-format-preview">
                    <span className="selected-format">Format -&nbsp;{timeStampInfo.format}</span>
                    <HiOutlineChevronRight style={ open ? { transform : "rotate(90deg)" } : {} }/>
                </div>
                <div ref={dropdownRef} className="timestamp-format-dropdown-items" style={ open ? { height : dropdownRef.current.scrollHeight + "px"} : { height : "0px"}}>
                    {
                        formatList.map(function(option) {
                            return <div className="timestamp-format-option" key={option} style={option === timeStampInfo.format ? {backgroundColor:"rgb(88, 101, 242)"} : {}}onClick={ (e) => {
                                e.stopPropagation();
                                if(option === timeStampInfo.format) setOpen(false);
                                selectFormat(option);
                            }}>{option}</div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}