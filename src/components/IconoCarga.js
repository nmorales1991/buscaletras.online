import React from "react";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function IconoCarga() {
    const override = css`
        display: block;
        margin: 0 auto;
    `;
    return (
        <div className="sweet-loading">
            <PacmanLoader
                css={override}
                sizeUnit={"px"}
                size={25}
                color={"#369"}
                loading={true}
            />
        </div>
    );
}
