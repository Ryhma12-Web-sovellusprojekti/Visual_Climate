import React from "react";

function ConfirmationDialog({yesFunction, noFunction }) {

    // Return JSX that represents a confirmation dialog with two buttons, one to confirm and one to cancel
    return (
        <div className="dialog-wrapper">
            <div className="dialog">
                <h3>Are you sure?</h3>
                <button className="small-btn" data-testid="yes" onClick={yesFunction}>Yes</button>
                <button className="small-btn" onClick={noFunction}>No</button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;
