import React from 'react';

const SensorData = (props) => {

    let gasDesc = "";
    let gasDescColor = "white";
    if (props.gasLevel) {
        if (props.gasLevel <= 350) {
            gasDesc = "Safe";
            gasDescColor = "green";
        }
        if (props.gasLevel > 350 && props.gasLevel <= 600) {
            gasDesc = "Substantial";
            gasDescColor = "yellow";
        }
        if (props.gasLevel > 600) {
            gasDesc = "HIGH";
            gasDescColor = "red"
        }
    }

    return (
        <div className='video__sensors' hidden={props.hidden}>
            <p className='video__sensors-data'>
                Temperature: {props.temperature ? `${props.temperature} *C` : 'N/A'}
            </p>
            <p className='video__sensors-data'>
                Humidity: {props.humidity ? `${props.humidity} %` : 'N/A'}
            </p>
            <p className={`video__sensors-data ${gasDescColor}`}>
                Gas level: {props.gasLevel ? `${props.gasLevel} (${gasDesc})` : 'N/A'}
            </p>
        </div>
    )
}

export default SensorData;