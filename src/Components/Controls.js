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
    let turn = 1;

    function startTimer() {
        console.log("Timer started")
        if ((minutesWhite !== 0 || secondsWhite !== 0 || milliSecondsWhite !== 0) && (minutesBlack !== 0 || secondsBlack !== 0 || milliSecondsBlack !== 0)) {
            if (currentPlayer) {
                setIsRunningWhite(true);
            } else {
                setIsRunningBlack(true);
            }
             turn++;

            setShowEndScreen({...showEndScreen, show: false});
        } else {
            window.alert("Add Time");
        }
    }

    function pauseTimer() {

        if (isRunningWhite) {
            currentPlayer = true;
        } else {
            currentPlayer = false;
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

    useEffect(() => {
        window.addEventListener("keydown", toggleTimer)
    }, [])

    const toggleTimer = (event) => {
        if (event.keyCode === 32) {
            if (turn === 1) {
                setIsRunningWhite(true);
                turn++;
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
