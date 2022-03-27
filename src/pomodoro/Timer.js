import React from "react";
import {minutesToDuration, secondsToDuration} from "../utils/duration";

function Timer({ isTimerRunning, isSessionActive, session, setSession, focusDuration, breakDuration }) {
  
 if (isTimerRunning === false && isSessionActive === false) {
    return (<div></div>
    )
}  
  const duration = (session.label === "Focusing" ? focusDuration : breakDuration)
  
  let progress = (1 - ((session.timeRemaining) / (duration* 60)))*100

return (
  <div>
   <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {`${session.label} for`} {minutesToDuration(duration)} minutes         
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(session.timeRemaining)} remaining
            </p>
                       
              <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progress}
              style={{ width: `${progress}%` }
                    }
            />
          </div>
          <p/>
          <div class="pause"><h3>{!isTimerRunning && `PAUSED`}</h3></div>
        </div>
      </div>
            
            
            
          </div>
        </div>
    </div>
    )
  

  
}

export default Timer;