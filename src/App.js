import React from 'react';
import Countdown from "./Components/Countdown";
import './App.css';

function App() {

  return (
      <div>
        <div className="blackSide">
            <Countdown />
        </div>
          <div className="whiteSide">
              <Countdown />
          </div>
      </div>
  );
}

export default App;
