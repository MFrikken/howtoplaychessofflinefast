import React from 'react';
import styled from "styled-components";


function VersionText() {

    const VersionWrapper = styled.div`
      color: #eeee;
      box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.4);
      font-size: 33px;
      font-weight: bold;
      opacity: 0.25;
    `;

    return (
        <VersionWrapper >
            <div className="version">
                   <a href={"/License"} style={{ color: "white"}}>v1.0</a>
            </div>
        </VersionWrapper>
    );
}

export default VersionText;
