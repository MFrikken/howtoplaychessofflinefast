import React, {useEffect, useState} from 'react';
import Timer from "./Timer";
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs";


function Countdown() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliSeconds, setMilliSeconds] = useState(0);

    const [isRunning, setIsRunning] = useState(null);

    const [showEndScreen, setShowEndScreen] = useState({
        show: false,
        message: "Time is up!"
    });

    useEffect(() => {
        let interval;
        if (isRunning) {
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


    // Start Pause & Stop function

    function startTimer() {
        if (minutes !== 0 || seconds !== 0 || milliSeconds !== 0) {
            setIsRunning(true);
            setShowEndScreen({...showEndScreen, show: false});
        } else {
            window.alert("Add Time");
        }
    }

    function pauseTimer() {
        setIsRunning(false);
    }

    function stopTimer() {
        resetTimer();
    }

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

            {!isRunning && (<button className="btn btn-accept btn-lg" onClick={startTimer}>
                <BsFillPlayFill />
            </button> )}

            {isRunning && (<button className="btn btn-warning btn-lg" onClick={pauseTimer}>
                <BsPauseFill />
            </button> )}{" "}
            <button className="btn btn-danger btn-lg" onClick={stopTimer}>
                <BsStopFill />
            </button>

        </div>
    )
}

export default Countdown;
