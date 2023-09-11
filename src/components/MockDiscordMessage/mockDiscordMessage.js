import "./MockDiscordMessage.css"
import { useTimeStampInfo } from "../../util/TimeStampContext";
import { FaDiscord } from "react-icons/fa";
export default function MockDiscordMessage(props) {
    const timeStampInfo = useTimeStampInfo();
    const TimeConverter = require("../../util/TimeConverter.js")
    return (
        <div className="mock-discord-message-container">
            <div className="mock-content-wrapper">
                <div className="avatar-box">
                    <FaDiscord size="1.75rem"/>
                </div>
                <div className="message-layout">
                    <div className="message-info-bar">
                        <span className="message-sender-text">TimeKeeper</span>
                        <span className="message-time-text">{props.messageTime}</span>
                    </div>
                    <div className="message-content-layout">
                        <span className="message-default-text">Your countdown ends&nbsp;{props.bridge}</span>
                        <span className="message-countdown-text">{TimeConverter.getConvertedTime(timeStampInfo.targetTime, timeStampInfo.format)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}