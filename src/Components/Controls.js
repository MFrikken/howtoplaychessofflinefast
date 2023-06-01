import React, {useEffect, useState, useRef} from 'react';
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
    let currentPlayer = useRef(true);

    let isPaused = useRef(true);

    let isFirstTurn = useRef(true);

    function startTimer() {
        if ((minutesWhite !== 0 || secondsWhite !== 0 || milliSecondsWhite !== 0) && (minutesBlack !== 0 || secondsBlack !== 0 || milliSecondsBlack !== 0)) {
            if ((parseInt(minutesWhite, 10) <= 99 && parseInt(secondsWhite, 10) <= 59 && parseInt(milliSecondsWhite, 10) <= 99) && (parseInt(minutesBlack, 10) <= 99 && parseInt(secondsBlack, 10) <= 59) && parseInt(milliSecondsBlack, 10) <= 99) {
                if (isFirstTurn.current) {
                    fetch('http://localhost:8080/playedGames/increaseCount')
                        .then(response => console.log(response.json()));
                    isFirstTurn.current = false;
                }
                isPaused.current = false;
                if (currentPlayer.current) {
                    setIsRunningWhite(true);
                } else {
                    setIsRunningBlack(true);
                }
                setShowEndScreen({...showEndScreen, show: false});
            } else {
                window.alert("Not a valid time \n\nMax 99 minutes")
            }
        } else {
            window.alert("Add time");
        }
    }

    function pauseTimer() {

        if (isRunningWhite) {
            currentPlayer.current = true;
        } else if (isRunningBlack) {
            currentPlayer.current = false;
        }

        isPaused.current = true;
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

        isPaused.current = true;
        currentPlayer.current = true;
        isFirstTurn.current = true;
    }

    useEffect(() => {
        window.addEventListener("keydown", toggleTimer)
    }, [])

    const toggleTimer = (event) => {
        if (event.keyCode === 32 && isPaused.current === false) {

            if (currentPlayer.current) {
                setIsRunningWhite(false);
                setIsRunningBlack(true);
                currentPlayer.current = false;
            } else {
                setIsRunningWhite(true);
                setIsRunningBlack(false);
                currentPlayer.current = true;
            }
        }
    };

    return (<div className="buttons">

        {/* {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>} */}

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
