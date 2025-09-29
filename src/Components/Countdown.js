import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

function Countdown(props) {
    // props.minutes === [minutes, setMinutes], etc.
    const minutesTuple = props.minutes || [0, () => {}];
    const secondsTuple = props.seconds || [0, () => {}];
    const milliTuple = props.milliSeconds || [0, () => {}];
    const isRunningTuple = props.isRunning || [false, () => {}];

    const [minutes, setMinutes] = minutesTuple;
    const [seconds, setSeconds] = secondsTuple;
    const [milliSeconds, setMilliSeconds] = milliTuple;
    const [isRunning, setIsRunning] = isRunningTuple;

    const initialTimeLeft = (() => {
        const m = Number(minutes) || 0;
        const s = Number(seconds) || 0;
        const ms = Number(milliSeconds) || 0;
        return m * 60_000 + s * 1000 + ms * 10;
    })();

    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
    const lastStartRef = useRef(null);

    const [showEndScreen, setShowEndScreen] = useState({
        show: false,
        message: "Time is up!",
    });

    // If inputs change while the clock is NOT running, make sure timeLeft is being updated
    useEffect(() => {
        if (!isRunning) {
            const m = Number(minutes) || 0;
            const s = Number(seconds) || 0;
            const ms = Number(milliSeconds) || 0;
            setTimeLeft(m * 60_000 + s * 1000 + ms * 10);
        }
    }, [minutes, seconds, milliSeconds, isRunning]);

    // Run the clock
    useEffect(() => {
        let interval;
        if (isRunning) {
            lastStartRef.current = performance.now();
            interval = setInterval(() => {
                const now = performance.now();
                const elapsed = now - lastStartRef.current;
                lastStartRef.current = now;

                setTimeLeft((prev) => {
                    const updated = Math.max(prev - elapsed, 0);

                    // update the parent minute/second/milli states so the Timer inputs show the derived values
                    const mins = Math.floor(updated / 60000);
                    const secs = Math.floor((updated % 60000) / 1000);
                    const millis = Math.floor((updated % 1000) / 10);

                    setMinutes(mins);
                    setSeconds(secs);
                    setMilliSeconds(millis);

                    if (updated === 0) {
                        setIsRunning(false);
                        setShowEndScreen({ show: true, message: "Time is up!" });
                    }
                    return updated;
                });
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning, setMinutes, setSeconds, setMilliSeconds, setIsRunning]);

    function resetTimer() {
        setIsRunning(false);
        setTimeLeft(0);
        setMinutes(0);
        setSeconds(0);
        setMilliSeconds(0);
        setShowEndScreen({ show: false, message: "Time is up!" });
    }

    // sanitize helper
    const sanitizeNumber = (raw) => {
        if (raw === undefined || raw === null) return 0;
        const s = String(raw).replace(/\D/g, "");
        return s === "" ? 0 : parseInt(s, 10);
    };

    // Handlers update both the parent states and the internal timeLeft (so the clock reflects edits immediately)
    const changeSeconds = (e) => {
        const val = sanitizeNumber(e.target.value);
        const sanitized = Math.min(59, Math.max(0, val));
        setSeconds(sanitized);
        setTimeLeft((_) => (Number(minutes) || 0) * 60000 + sanitized * 1000 + (Number(milliSeconds) || 0) * 10);
    };

    const changeMinutes = (e) => {
        const val = sanitizeNumber(e.target.value);
        const sanitized = Math.max(0, val);
        setMinutes(sanitized);
        setTimeLeft((_) => sanitized * 60000 + (Number(seconds) || 0) * 1000 + (Number(milliSeconds) || 0) * 10);
    };

    const displayMinutes = Math.floor(timeLeft / 60000);
    const displaySeconds = Math.floor((timeLeft % 60000) / 1000);
    const displayMilli = Math.floor((timeLeft % 1000) / 10);

    return (
        <div>
            {showEndScreen.show && <h1 className="title">{showEndScreen.message}</h1>}

            <Timer
                milliSeconds={displayMilli}
                seconds={displaySeconds}
                minutes={displayMinutes}
                changeSeconds={changeSeconds}
                changeMinutes={changeMinutes}
            />
        </div>
    );
}

export default Countdown;
