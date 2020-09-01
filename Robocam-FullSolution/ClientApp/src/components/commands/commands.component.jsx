import React from 'react';

import { Grid, Slider, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import icons from '../../assets/sprites.svg';

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
                    orientation="vertical"
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

const CommandsPanel = (props) => {

    return (
        <>
            <div className='commands__container'>
                {props.disabled && <div className='commands__cover'></div>}
                <div className='commands__title'>
                    <Typography variant="h4">Commands</Typography>
                </div>
                <br />
                <div className='commands__panel'>
                    <div className='commands__panel-fblr'>
                        <button className={`commands__command commands__command-1 ${!props.disabled ? 'enabled' : ''}`} onMouseDown={() => { props.startMove("up") }} onMouseUp={() => { props.stopMove() }} disabled={props.disabled}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <button className={`commands__command commands__command-2 ${!props.disabled ? 'enabled' : ''}`} onMouseDown={() => { props.startMove("left") }} onMouseUp={() => { props.stopMove() }} disabled={props.disabled}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <button className={`commands__command commands__command-3 ${!props.disabled ? 'enabled' : ''}`} onMouseDown={() => { props.startMove("right") }} onMouseUp={() => { props.stopMove() }} disabled={props.disabled}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <button className={`commands__command commands__command-4 ${!props.disabled ? 'enabled' : ''}`} onMouseDown={() => { props.startMove("down") }} onMouseUp={() => { props.stopMove() }} disabled={props.disabled}>
                            <svg><use xlinkHref={`${icons}#icon-darr`}></use></svg>
                        </button>
                        <div className='commands__slider'>
                            <VerticalSlider onChangeCommitted={props.handleSliderChange} />
                        </div>
                    </div>
                    <Grid container item xs={12} className='commands__panel-start-stop'>
                        <Grid item xs={6}>
                            <Button className={`button-stop ${!props.disabled ? 'enabled' : ''}`} fullWidth disabled={props.disabled} onClick={() => { props.stopMove() }}>STOP</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={`button-start ${!props.disabled ? 'enabled' : ''}`} fullWidth disabled={props.disabled}><AddAPhotoIcon /> PHOTO</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                className={`checkbox-analogue ${!props.disabled ? 'enabled' : ''}`}
                                control={<Checkbox
                                />}
                                label="Analogue mode"
                                disabled={props.disabled}
                                onChange={props.handleAnalogueChange}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
            {props.disabled && <div>
                <Typography variant="h4" className="commands-disabled__tooltip">
                    Commands will be enabled once the streaming component is live.
                </Typography>
            </div>}
        </>
    );
}

export default CommandsPanel