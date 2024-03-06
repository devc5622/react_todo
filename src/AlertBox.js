import React from 'react';

function AlertBox({ message, onClose }) {
    return (
        <div className="alert">
            <p>{message}</p>
            <button onClick={onClose}>OK, I get it</button>
        </div>
    );
}

export default AlertBox;