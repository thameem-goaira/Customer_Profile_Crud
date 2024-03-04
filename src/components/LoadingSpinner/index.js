import React from "react";
import { Spinner } from "react-bootstrap";


export const LoadingSpinner = () => {
    return (
        <div style={{ position: "relative", height: 300 }}>
            <Spinner style={{ position: "absolute", top: "50%", left: "50%" }} animation="border" variant="danger" />
        </div>
    )
}