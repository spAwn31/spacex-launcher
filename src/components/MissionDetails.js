import React from "react";
import '../assets/styles/MissionDetails.css'

function MissionDetails({details}) {
    const {
        flight_number,
        mission_name,
        mission_id,
        launch_year,
        launch_success,
        links,
        rocket,
    } = details;
    const imgSrc = links.mission_patch_small;
    const land_success = rocket.first_stage.cores[0].land_success;

    return (
        <div className="mission-details">
            <div key={flight_number}>
                <div>
                    <img
                        src={imgSrc}
                        alt="patch image is not available on api"
                        className="mission-image"
                    />
                </div>
                <div className="mission-name-flight-number">
                    {mission_name} #{flight_number}
                </div>
                <div className="mission-detail-label">
                    Mission Ids:{" "}
                    <ul>
                        {" "}
                        <li className="mission-detail-value">{mission_id}</li>
                    </ul>
                </div>
                <div className="mission-detail-label">
                    Launch Year:{" "}
                    <span className="mission-detail-value">
                        {launch_year}
                    </span>
                </div>
                <div className="mission-detail-label">
                    Successful Launch:{" "}
                    <span className="mission-detail-value">
                        {launch_success ? "true" : "false"}
                    </span>
                </div>
                <div className="mission-detail-label">
                    Successful Landing:{" "}
                    <span className="mission-detail-value">
                        {land_success ? "true" : "false"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MissionDetails;
