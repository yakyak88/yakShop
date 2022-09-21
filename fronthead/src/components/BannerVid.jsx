import React from "react";

function BannerVid() {
    // component for the banner video
    return (
        <div style={{ width: "100%" }} className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <video className="video-fluid" autoPlay loop muted>
                        <source
                            src="images/production ID_5054435.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
        </div>
    );
}

export default BannerVid;
