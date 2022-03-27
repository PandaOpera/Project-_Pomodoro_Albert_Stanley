import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Timer from "../pomodoro/Timer.js";
import Duration from "../pomodoro/Duration.js";
import Controls from "../pomodoro/Controls.js";

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
        timeTotal: breakDuration * 60, 
        percentComplete: 0,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
      timeTotal: focusDuration * 60, 
      percentComplete: 0,
    };
  };
}

function Pomodoro() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
 
  
  const clearSessionState = {
    label: "Focusing", 
    duration: focusDuration, 
    timeRemaining: 25*60, 
    percentComplete: 0 
  }  
  
  
  const [session, setSession] = useState(clearSessionState);
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/2386.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );


  return (  
    
    
    <div className="pomodoro">
      
      
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
      crossorigin="anonymous"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css"
      integrity="sha512-UyNhw5RNpQaCai2EdC+Js0QL4RlVmiq41DkmCJsRV3ZxipG2L0HhTqIf/H9Hp8ez2EnFlkBnjRGJU2stW3Lj+w=="
      crossorigin="anonymous"
    />
      
      
      <Duration 
        session={session}
        focusDuration={focusDuration}
        setFocusDuration={setFocusDuration}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration} /> 

      <Controls
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        setIsSessionActive={setIsSessionActive}
        setSession={setSession}
        focusDuration={focusDuration}
        clearSessionState={clearSessionState}
        />
   
      
      
        <Timer 
          isTimerRunning={isTimerRunning} 
          isSessionActive={isSessionActive}
          session={session} 
          setSession={setSession} 
          focusDuration={focusDuration}
          breakDuration={breakDuration} />

      </div>

  );
  
        
          
}

export default Pomodoro;

