import React, {useState} from 'react';
import Timer from "./Timer";
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs";

function Controls(props) {

    const [showEndScreen, setShowEndScreen] = useState({
        show: false,
        message: "Time is up!"
    });
    
    const [isRunningWhite, setIsRunningWhite] = props.isRunningWhite;
    const [minutesWhite, setMinutesWhite] = props.minutesWhite;
    const [secondsWhite, setSecondsWhite] = props.secondsWhite;
    const [milliSecondsWhite, setMilliSecondsWhite] = props.milliSecondsWhite;

    const [isRunningBlack, setIsRunningBlack] = props.isRunningBlack;
    const [minutesBlack, setMinutesBlack] = props.minutesBlack;
    const [secondsBlack, setSecondsBlack] = props.secondsBlack;
    const [milliSecondsBlack, setMilliSecondsBlack] = props.milliSecondsBlack;

    // true = white, false = black
    const [currentPlayer, setCurrentPlayer] = true;

    function startTimer() {
        if (minutesWhite !== 0 || secondsWhite !== 0 || milliSecondsWhite !== 0 && minutesBlack !== 0 || secondsBlack !== 0 || milliSecondsBlack !== 0) {
            if (currentPlayer) {
                setIsRunningWhite(true);
            } else {
                setIsRunningBlack(true);
            }
            setShowEndScreen({...showEndScreen, show: false});
        } else {
            window.alert("Add Time");
        }
    }

    function pauseTimer() {

        if (isRunningWhite) {
            setCurrentPlayer(true);
        } else {
            setCurrentPlayer(false);
        }

        setIsRunningWhite(false);
        setIsRunningBlack(false);
    }

    function stopTimer() {
        resetTimer();
    }

    function resetTimer() {
        setIsRunningWhite(false);
        setMilliSecondsWhite(0);
        setSecondsWhite(0);
        setMinutesWhite(0);

        setIsRunningBlack(false);
        setMilliSecondsBlack(0);
        setSecondsBlack(0);
        setMinutesBlack(0);
    }

    const toggleTimer = (event) => {
        if (event.key === 'Space') {
            startTimer();
        }
    };

    return (
        <div>

            {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>}

            <br/>

            {!isRunningWhite || !isRunningBlack && (<button className="btn btn-accept btn-lg" onClick={startTimer}>
                <BsFillPlayFill/>
            </button>)}

            {isRunningWhite || isRunningBlack && (<button className="btn btn-warning btn-lg" onClick={pauseTimer}>
                <BsPauseFill/>
            </button>)}{" "}
            <button className="btn btn-danger btn-lg" onClick={stopTimer}>
                <BsStopFill/>
            </button>

        </div>
    )
}

export default Controls;
