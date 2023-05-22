import React, {useState} from 'react';
import Countdown from "./Components/Countdown";
import Controls from "./Components/Controls";
import './App.css';

function App() {

    // const [isRunningWhite, setIsRunningWhite] = useState(false);
    var isRunningWhite = useState(false)
    var minutesWhite = useState(0);
    var secondsWhite = useState(0);
    var milliSecondsWhite= useState(0);

    var isRunningBlack = useState(false);
    var minutesBlack = useState(0);
    var secondsBlack = useState(0);
    var milliSecondsBlack = useState(0);

    return (
        <div className="wrapper">
            <div className="timers">
            <div className="blackSide">
                <Countdown isRunning={isRunningBlack}
                           minutes={minutesBlack}
                           seconds={secondsBlack}
                           milliSeconds={milliSecondsBlack}
                />
            </div>
            <div className="whiteSide">
                <Countdown isRunning={isRunningWhite}
                           minutes={minutesWhite}
                           seconds={secondsWhite}
                           milliSeconds={milliSecondsWhite}
                />
            </div>
            </div>
            <div className="controls">
                <Controls isRunningBlack={isRunningBlack}
                          minutesBlack={minutesBlack}
                          secondsBlack={secondsBlack}
                          milliSecondsBlack={milliSecondsBlack}
                          isRunningWhite={isRunningWhite}
                          minutesWhite={minutesWhite}
                          secondsWhite={secondsWhite}
                          milliSecondsWhite={milliSecondsWhite}
                />
            </div>
        </div>
    );
}

export default App;
