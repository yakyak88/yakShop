// react component for the header image on the home page
//
//

import React from "react";

function BannerIMG() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <img
                        src={"/images/signup.png"}
                        className="d-block w-100 carouselImg"
                        alt="..."
                    />
                </div>
            </div>
        </div>
    );
}

export default BannerIMG;
