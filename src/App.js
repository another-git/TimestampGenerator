import './App.css';
import { TimeStampProvider } from './util/TimeStampContext.js'
import TimeStampCreator from './components/TimestampCreator/timestampCreator.js'
import MockDiscordMessage from './components/MockDiscordMessage/mockDiscordMessage.js'
import { useState, useEffect } from "react";

function App() {
  const [creationMode, setCreationMode] = useState("Relative");
  const [stampMode, setStampMode] = useState("Relative");
  const [convertedCountDownTime, setConvertedCountDownTime] = useState(undefined);
  const [convertedLoadTime, setConvertedLoadTime] = useState(undefined);
  const [loadTime, setloadTime] = useState(Date.now());
  const [countDownUnix, setCountDownUnix] = useState(Date.now());
  const TimeConverter = require("./util/TimeConverter.js")
  useEffect(() => {
    console.log("Format message time");
    setConvertedLoadTime(TimeConverter.getConvertedTime(loadTime, 'default'))
  }, [loadTime, TimeConverter])
  useEffect(() => {
    console.log("Countdown changed");
    setConvertedCountDownTime(TimeConverter.getConvertedTime(countDownUnix, stampMode))
  }, [countDownUnix, stampMode, TimeConverter])
  useEffect(() => {
    console.log("RENDER APP");
    setloadTime(Date.now());
  }, [])
  function creationModeCallBack(mode) {
    setCreationMode(mode);
  }
  function stampModeCallBack(mode) {
    console.log("SET STAMP MODE : " + mode);
    setStampMode(mode);
  }
  function timeChangeCallBack(time) {
    console.log("SET COUNTDOWN TIME : " + time);
    setCountDownUnix(time);
  }
  return (
    <div className="page-body">
      <div className="main-section-wrapper">
        <header className="main-section-header">
          <h1>Another Discord Timestamp Generator</h1>
        </header>
        <TimeStampProvider>
          <section className="app-intro-section">
            <span><b>You can use this tool to create embedded timestamps, like the one below.</b></span>
            <section className="mock-discord-message-section">
              <MockDiscordMessage messageTime={convertedLoadTime} countdownTime={convertedCountDownTime}/>
            </section>
            <span><b>(This message also shows what you will see in Discord!)</b></span>
          </section>
          <section className="timestamp-creator-section">
            <TimeStampCreator creationMode={creationMode} creationModeCallBack={creationModeCallBack} countdownTime={convertedCountDownTime} countDownUnix={countDownUnix} timeChangeCallBack={timeChangeCallBack} stampMode={stampMode} stampModeCallBack={stampModeCallBack}/>
          </section>
        </TimeStampProvider>
        <section className="app-footer-section">

        </section>
      </div>
    </div>
  );
}

export default App;
