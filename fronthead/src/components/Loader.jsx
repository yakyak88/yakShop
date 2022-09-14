import React from "react";

function Loader() {
    return (
        <div className="container">
            <div className="text-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loader;
