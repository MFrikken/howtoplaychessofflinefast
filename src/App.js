import React, {useEffect, useState} from 'react';
import Countdown from "./Components/Countdown";
import Controls from "./Components/Controls";
import './App.css';

function App() {

    const [isRunningBlack, setIsRunningBlack] = useState[null];
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliSeconds, setMilliSeconds] = useState(0);

  return (
      <div>
        <div className="blackSide">
            <Countdown isRunning={isRunningBlack} minutes={minutes} seconds={seconds} milliSeconds={milliSeconds}/>
        </div>
          <div className="whiteSide">

          </div>
          <div className="controls">
              <Controls />
          </div>
      </div>
  );
}

export default App;
