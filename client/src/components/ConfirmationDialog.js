import React from "react";

function ConfirmationDialog({yesFunction, noFunction }) {

    return (
        <div className="dialog-wrapper">
            <div className="dialog">
                <h3>Are you sure?</h3>
                <button className="small-btn" onClick={yesFunction}>Yes</button>
                <button className="small-btn" onClick={noFunction}>No</button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;