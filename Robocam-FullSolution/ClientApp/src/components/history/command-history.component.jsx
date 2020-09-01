import React from 'react';

import { Grid, Typography, Button } from '@material-ui/core';
import generateUID from '../../helper/generateUID';

const CommandHistory = (props) => {


    return (
        <div className='command-log'>
            <Grid item container alignItems="center" className='command-log__header'>
                <Grid item xs={6}>
                    <Typography variant="h3">Command log</Typography>
                </Grid>
                <Grid item xs={6} className='command-log__display-button-container'>
                    <Button disabled={false} className="button-display-log disabled" variant="outlined" onClick={props.toggleLogHidden}>{props.hidden ? "Display log" : "Hide log"}</Button>
                </Grid>
            </Grid>

            <div hidden={props.hidden}>
                {props.commands.length > 0 ? props.commands.map((command) =>
                    <p key={generateUID()} className='command__log-command'>
                        <span className='time'>{command.timestamp}</span> {command.content}
                    </p>) : '...'
                }
            </div>
        </div>
    );
}

export default CommandHistory;