import React from 'react';
import Timer from "./Timer";
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs";

function Controls(props) {

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

    function resetTimer() {
        setIsRunning(false);
        setMilliSeconds(0);
        setSeconds(0);
        setMinutes(0);
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

export default Controls;
