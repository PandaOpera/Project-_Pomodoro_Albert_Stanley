import React from "react";
import classNames from "../utils/class-names";
import {minutesToDuration} from "../utils/duration";

function Controls({isTimerRunning, setIsTimerRunning, setIsSessionActive, setSession, focusDuration, clearSessionState}) {
 
 
  function playPause() {
    
    setIsTimerRunning((prevState) => {
      
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            
            return {
              label: "Focusing",
              timeRemaining: minutesToDuration(focusDuration), 
              timeTotal: focusDuration * 60, 
              timeRemaining: focusDuration * 60, 
              percentComplete: 0,
              
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }
  
  return (
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={() => {
                playPause()
                setIsSessionActive(true)}
                }
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              type="button"
              disabled= {!isTimerRunning}
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={() => {
                setIsTimerRunning(false)
                setSession(clearSessionState)
                setIsSessionActive(false)
              }}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      )
}

export default Controls;