import { createContext, useContext, useReducer } from 'react';

const TimeStampContext = createContext(null);

const TimeStampDispatchContext = createContext(null);

export function TimeStampProvider({ children }) {
  const [timeStampInfo, dispatch] = useReducer(
    timeStampInfoReducer,
    initialTimeStampInfo
  );

  return (
    <TimeStampContext.Provider value={timeStampInfo}>
      <TimeStampDispatchContext.Provider value={dispatch}>
        {children}
      </TimeStampDispatchContext.Provider>
    </TimeStampContext.Provider>
  );
}

export function useTimeStampInfo() {
  return useContext(TimeStampContext);
}

export function useTimeStampInfoDispatch() {
  return useContext(TimeStampDispatchContext);
}

function timeStampInfoReducer(timeStampInfo, action) {
    const updatedStampInfo = { ...timeStampInfo }
  switch (action.type) {
    case 'timeTick': {
        updatedStampInfo.targetTime = Date.now() + parseInt(updatedStampInfo.relativeTime["Weeks"]) * 604800000 + parseInt(updatedStampInfo.relativeTime["Days"]) * 86400000 + parseInt(updatedStampInfo.relativeTime["Hours"]) * 3600000 + parseInt(updatedStampInfo.relativeTime["Minutes"]) * 60000 + parseInt(updatedStampInfo.relativeTime["Seconds"]) * 1000;
        return updatedStampInfo;
    }
    case 'setDateTime': {
        updatedStampInfo.targetTime = action.payload;
        return updatedStampInfo;
    }
    case 'setRelativeTime': {
        updatedStampInfo.relativeTime = action.payload;
        updatedStampInfo.targetTime = Date.now() + parseInt(updatedStampInfo.relativeTime["Weeks"]) * 604800000 + parseInt(updatedStampInfo.relativeTime["Days"]) * 86400000 + parseInt(updatedStampInfo.relativeTime["Hours"]) * 3600000 + parseInt(updatedStampInfo.relativeTime["Minutes"]) * 60000 + parseInt(updatedStampInfo.relativeTime["Seconds"]) * 1000;
        return updatedStampInfo;
    }
    case 'setFormat': {
        updatedStampInfo.format = action.payload;
        return updatedStampInfo;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTimeStampInfo = {
    targetTime : Date.now(),
    relativeTime : {"Weeks":0, "Days":0, "Hours":0, "Minutes":0, "Seconds":0},
    format : "Date Weekday" 
};