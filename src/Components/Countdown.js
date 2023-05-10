import React, {useEffect, useState} from 'react';
import Timer from "./Timer";


function Countdown(props) {
    const [minutes, setMinutes] = props.minutes;
    const [seconds, setSeconds] = props.seconds;
    const [milliSeconds, setMilliSeconds] = props.milliSeconds;

    const [isRunning, setIsRunning] = props.isRunning;

    const [showEndScreen, setShowEndScreen] = useState({
        show: false,
        message: "Time is up!"
    });

    useEffect(() => {
        let interval;
        if (props.isRunning) {
            interval = setInterval(() => {
                if (milliSeconds > 0) {
                    setMilliSeconds((milliSeconds) => milliSeconds - 1);
                } else if (seconds > 0) {
                    setSeconds((seconds) => seconds - 1);
                    setMilliSeconds(99);
                } else if (minutes > 0) {
                    setMinutes((minutes) => minutes - 1);
                    setSeconds(59);
                    setMilliSeconds(99);
                }
            }, 10);
        }

        if (minutes === 0 && seconds === 0 && milliSeconds === 1){
            setShowEndScreen({...showEndScreen, show: true});
            resetTimer();
        }
        return () => clearInterval(interval);
    }, [milliSeconds, seconds, minutes, isRunning, showEndScreen.show]);


    function resetTimer(){
        setIsRunning(false);
        setMilliSeconds(0);
        setSeconds(0);
        setMinutes(0);
    }


    // Handlers

    const changeSeconds=(e)=>{
        setSeconds(e.target.value)
    }
    const changeMinutes=(e)=>{
        setMinutes(e.target.value)
    }


    return (
        <div>

            {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>}

            <Timer milliSeconds={milliSeconds} seconds={seconds} minutes={minutes} changeSeconds={changeSeconds} changeMinutes={changeMinutes}/>

            <br />
        </div>
    )
}

export default Countdown;
