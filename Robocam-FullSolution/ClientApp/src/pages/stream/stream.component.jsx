import React, { useState } from 'react';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import { Grid, Button } from '@material-ui/core';
import * as signalR from '@aspnet/signalr';
import StreamCommandsPanel from '../../components/commands/stream-commands.component';
import CommandHistory from '../../components/history/command-history.component';

const StreamPage = () => {

    const [streaming, setIsStreaming] = useState(false);

    const signalRController = (() => {
        let connection = null;
        let connectionOpen = false;

        return {
            sendMessage: (message) => {
                if (connectionOpen)
                    connection.invoke("SendCommand", message);
            },
            sendImage: (message) => {
                if (connectionOpen) {
                    connection.invoke("SendImage", message);
                }
            },
            startConnection: () => {
                connection = new signalR.HubConnectionBuilder().withUrl("/centralHub").build();

                connection.start().then(function () {
                    setIsStreaming(true);
                    connectionOpen = true;
                }).catch(function (err) {
                    setIsStreaming(false);
                    connectionOpen = false;
                    return console.error(err.toString());
                });

                //listen to new commands and print them
                connection.on("ReceiveCommand", (message, value) => {
                    switch (message) {
                        case "stop":
                            resetButtons();
                            break;
                        case "up":
                            setButtonUpPressed(true);
                            break;
                        case "left":
                            setButtonLeftPressed(true);
                            break;
                        case "right":
                            setButtonRightPressed(true);
                            break;
                        case "down":
                            setButtonDownPressed(true);
                            break;
                        case "aOn":
                            setAnalogueMode(true);
                            break;
                        case "aOff":
                            setAnalogueMode(false);
                            break;
                        case "v":
                            setSliderValue(Number(value));
                            break;
                        default:
                            break;
                    }
                    commandLog.unshift({
                        timestamp: new Date(Date.now()).toLocaleString(),
                        content: value ? message + value : message
                    });
                    setCommandLog(commandLog.slice(0, 10));
                });
            },
            // closeConnection: () => {
            //     if (connection) {
            //         connection.stop().then(function () {
            //             console.log("connection terminated");
            //             isWorking = false;
            //         }).catch(function (err) {
            //             console.log("error terminating connection");
            //             return console.error(err.toString());
            //         })
            //     }
            // }
        }

    })();

    const openStream = () => {
        const video = document.getElementById("video_src");

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        signalRController.startConnection();

        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
            console.log(video);
            video.srcObject = stream;
            video.play();


            setInterval(() => {

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                //Draw the video to canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                //take snapshot of canvas
                const imgScreenshot = canvas.toDataURL("image/jpeg", 0.5);

                //send image to hub, so it can be distributed to clients
                signalRController.sendImage(JSON.stringify(imgScreenshot));

            }, 150);

        }).catch((err) => console.log(err));

    }

    const closeStream = () => {
        alert("closing stream");
    }

    const resetButtons = () => {
        setButtonUpPressed(false);
        setButtonLeftPressed(false);
        setButtonRightPressed(false);
        setButtonDownPressed(false);
    }

    const [buttonUpPressed, setButtonUpPressed] = useState(false);
    const [buttonLeftPressed, setButtonLeftPressed] = useState(false);
    const [buttonRightPressed, setButtonRightPressed] = useState(false);
    const [buttonDownPressed, setButtonDownPressed] = useState(false);

    const [analogueMode, setAnalogueMode] = useState(false);

    const [sliderValue, setSliderValue] = useState(50);

    const [commandLog, setCommandLog] = useState([]);
    const [logHidden, setLogHidden] = useState(false);

    const toggleLogHidden = () => {
        setLogHidden(!logHidden);
    }

    return (
        <div className='robocam'>
            <Grid className='robocam__main' item container xs={12} justify="" spacing={3}>
                <Grid item xs={4} lg={3}>
                    <StreamCommandsPanel
                        analogueMode={analogueMode}
                        buttonUpPressed={buttonUpPressed}
                        buttonDownPressed={buttonDownPressed}
                        buttonLeftPressed={buttonLeftPressed}
                        buttonRightPressed={buttonRightPressed}
                        streaming={streaming}
                        sliderValue={sliderValue}
                    />
                </Grid>
                <Grid item xs={8} lg={5}>
                    <div className='video__container'>
                        <div className='video__buttons'>
                            <Button className='video__button video__button-start' onClick={openStream}><PlayCircleFilledIcon /> START STREAM</Button>
                            <Button className='video__button video__button-pause' onClick={closeStream}><PauseCircleFilledIcon /> PAUSE STREAM</Button>
                        </div>
                        <div id="webcam-root" className='video__feed'>
                            <video
                                id="video_src"
                                width={640}
                                height={480}
                                alt="sc"
                            />
                        </div>
                    </div>
                    <CommandHistory hidden={logHidden} toggleLogHidden={toggleLogHidden} commands={commandLog} />
                </Grid>

            </Grid>
        </div>
    )
}

export default StreamPage;