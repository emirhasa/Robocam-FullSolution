import React from 'react';

import { Grid, Slider, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import icons from '../../assets/sprites.svg';
import useWindowDimensions from '../../helper/useWindowDimensions';

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
                    onChangeCommitted={props.onChangeCommitted}
                    step={25}
                />
            </div>
        </React.Fragment>
    );
}

const StreamCommandsPanel = (props) => {

    const { height, width } = useWindowDimensions();
    const orientation = width > 1000 ? 'vertical' : 'horizontal';

    return (
        <>
            <div className='commands__container'>
                <div className={`commands__cover ${props.streaming ? 'commands__cover--transparent' : ''}`}></div>
                <div className='commands__title'>
                    <Typography variant="h4">Commands</Typography>
                </div>
                <br />
                <div className='commands__panel'>
                    <div className='commands__panel-fblr'>
                        <button className={`commands__command commands__command-1 ${props.buttonUpPressed ? 'active' : ''}`}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <button className={`commands__command commands__command-2 ${props.buttonLeftPressed ? 'active' : ''}`}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <button className={`commands__command commands__command-3 ${props.buttonRightPressed ? 'active' : ''}`}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <button className={`commands__command commands__command-4 ${props.buttonDownPressed ? 'active' : ''}`}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <div className='commands__slider'>
                            <VerticalSlider value={props.sliderValue} orientation={orientation} />
                        </div>
                    </div>
                    <Grid container item xs={12} className='commands__panel-start-stop'>
                        <Grid item xs={12}>
                            <FormControlLabel
                                className='checkbox-analogue'
                                control={<Checkbox
                                />}
                                label="Analogue mode"
                                disabled={true}
                                checked={props.analogueMode}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Typography variant="h4" className="commands-disabled__tooltip">
                Commands from the manager client will be displayed here.
            </Typography>
        </>
    );
}

export default StreamCommandsPanel;