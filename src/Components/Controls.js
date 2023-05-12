import React, {useEffect, useState} from 'react';
import {BsFillPlayFill, BsPauseFill, BsStopFill} from "react-icons/bs";

function Controls(props) {

    const [showEndScreen, setShowEndScreen] = useState({
        show: false, message: "Time is up!"
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
    var currentPlayer = true;
    var isFirstTurn = true;

    function startTimer() {
        console.log("Timer started")
        if ((minutesWhite !== 0 || secondsWhite !== 0 || milliSecondsWhite !== 0) && (minutesBlack !== 0 || secondsBlack !== 0 || milliSecondsBlack !== 0)) {
            console.log("Current player: "+ currentPlayer);
            if (currentPlayer) {
                setIsRunningWhite(true);
            } else {
                setIsRunningBlack(true);
            }
             if (isFirstTurn) {
                 console.log("Is first turn: " + isFirstTurn);
                 isFirstTurn = false;

             }
            console.log("Is first turn: " + isFirstTurn);
            setShowEndScreen({...showEndScreen, show: false});
        } else {
            window.alert("Add Time");
        }
    }

    function pauseTimer() {

        if (isRunningWhite) {
            currentPlayer = true;
        } else if (isRunningBlack) {
            currentPlayer = false;
        }

        setIsRunningWhite(false);
        setIsRunningBlack(false);

        console.log("Paused, current player: " + currentPlayer);
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

    useEffect(() => {
        window.addEventListener("keydown", toggleTimer)
    }, [])

    const toggleTimer = (event) => {
        if (event.keyCode === 32) {
            console.log("Spacebar pressed");
            console.log("Current player: " + currentPlayer);
            console.log("Is first turn: " + isFirstTurn);
            if (isFirstTurn) {
                setIsRunningWhite(true);
                isFirstTurn = false;
            } else {
                if (currentPlayer) {
                    setIsRunningWhite(false);
                    setIsRunningBlack(true);
                    currentPlayer = false;
                } else {
                    setIsRunningWhite(true);
                    setIsRunningBlack(false);
                    currentPlayer = true;
                }
            }
        }
    };

    return (<div>

            {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>}

            <br/>

            {(!isRunningWhite && !isRunningBlack) && (<button className="btn btn-accept btn-lg" onClick={startTimer}>
                <BsFillPlayFill/>
            </button>)}

            {(isRunningWhite || isRunningBlack) && (<button className="btn btn-warning btn-lg" onClick={pauseTimer}>
                <BsPauseFill/>
            </button>)}{" "}
            <button className="btn btn-danger btn-lg" onClick={stopTimer}>
                <BsStopFill/>
            </button>

        </div>)
}

export default Controls;
