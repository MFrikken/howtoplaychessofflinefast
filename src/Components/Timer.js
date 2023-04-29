import React, {useEffect, useState} from "react";
import {BsStopwatch} from "react-icons/bs";
import styled from "styled-components";

const TimerWrapper = styled.div`
  margin-top: 30vh;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  background-color: #222;
  color: #eeee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.4);
  padding: 1rem 0;

  .stop-watch {
    font-size: 6rem;
    margin-right: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input {
    width: 100px;
    margin-right: 1rem;
    color: #282C34;
    outline: none;
    border: none;
    font-size: 4.5rem;
    font-weight: 600;
    text-align: center;
    padding: 0rem 0.5rem;
    border-radius: 5px;
  }

  input:hover {
    background-color: #928f8f ;
  }
`;

function Timer({milliSeconds, seconds, minutes, changeSeconds, changeMinutes}) {

    return (
        <TimerWrapper>
            <BsStopwatch className="stop-watch"/>
            <div className="d-flex flex-column">
                <input value={minutes} onChange={changeMinutes}/>
            </div>
            {" "}
            <div className="d-flex flex-column">
                <input value={seconds} onChange={changeSeconds}/>
            </div>
            {" "}
            <div className="d-flex flex-column">
                <input value={milliSeconds}/>
            </div>
        </TimerWrapper>
    )
}

export default Timer;