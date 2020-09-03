import React from 'react';

import { Typography, Slider } from '@material-ui/core';

const marks = [
    {
        value: 0,
        label: '1',
    },
    {
        value: 25,
        label: '2',
    },
    {
        value: 50,
        label: '3',
    },
    {
        value: 75,
        label: '4',
    },
    {
        value: 100,
        label: '5',
    }
];

function valuetext(value) {
    return `${value}%`;
}

//THIS vertical slider doesn't send on change it's used for displaying, thus is separate from one inside commands component
const VerticalSlider = (props) => {

    return (
        <React.Fragment>
            <Typography id="vertical-slider" gutterBottom>
                Velocity
            </Typography>
            <div>
                <Slider
                    orientation={props.orientation}
                    defaultValue={50}
                    aria-labelledby="vertical-slider"
                    getAriaValueText={valuetext}
                    marks={marks}
                    value={props.value}
                />
            </div>
        </React.Fragment>
    );
}

export default VerticalSlider;