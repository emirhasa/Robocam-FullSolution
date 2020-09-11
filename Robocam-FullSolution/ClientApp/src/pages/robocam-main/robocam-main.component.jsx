import React, { useState } from 'react';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import { Grid, Typography, Button } from '@material-ui/core';
import * as signalR from '@aspnet/signalr';
import CommandHistory from '../../components/history/command-history.component';
import CommandsPanel from '../../components/commands/commands.component';
import SensorData from '../../components/sensor-data/sensor-data.component';

const RobocamMainPage = () => {

    const signalRController = () => {

        const connection = new signalR.HubConnectionBuilder().withUrl("/centralHub").build();
        const video = document.getElementById('video-rcv');

        connection.start().then(function () {
            console.log("connected");
        }).catch(function (err) {
            console.log("no connect");
            return console.error(err.toString());
        });

        connection.on("ReceiveImage", (message) => {
            console.log(message);
            console.log(video);
            video.src = JSON.parse(message);
        });

        connection.on("ReceiveSensorData", sensorData => {
            console.log(sensorData);
            setHumidity(sensorData.humidity);
            setTemperature(sensorData.temperature);
            setGasLevel(sensorData.gasLevel);
        });

        return {
            sendMessage: (message, value = null) => {
                connection.invoke("SendCommand", message, value).then(() => console.log(`Message sent with content: ${message}`));
            },
            closeConnection: () => {
                video.src = null;
                connection.stop().then(function () {
                    console.log("connection terminated");
                }).catch(function (err) {
                    console.log("error terminating connection");
                    return console.error(err.toString());
                })
            }
        }
    };

    const openVideo = () => {
        setVideoManager(signalRController());
        setFeedHidden(false);
    }

    const pauseVideo = () => {
        if (videoManager) {
            videoManager.closeConnection();
            setFeedHidden(true);
        } else {
            alert("No ongoing connection");
        }
    }

    const [feedHidden, setFeedHidden] = useState(true);
    const [videoManager, setVideoManager] = useState(null);

    const sendCommand = (command, value = null) => {
        if (videoManager) {
            switch (command) {
                case "up":
                    videoManager.sendMessage("up");
                    break;
                case "left":
                    videoManager.sendMessage("left");
                    break;
                case "right":
                    videoManager.sendMessage("right");
                    break;
                case "down":
                    videoManager.sendMessage("down");
                    break;
                case "stop":
                    videoManager.sendMessage("stop");
                    break;
                case "aOn":
                    videoManager.sendMessage("aOn");
                    break;
                case "aOff":
                    videoManager.sendMessage("aOff");
                    break;
                case "v":
                    videoManager.sendMessage("v", value)
                    break;
                default:
                    break;
            }
            commandLog.unshift({
                timestamp: new Date(Date.now()).toLocaleString(),
                content: value ? command + value : command
            });
            setCommandLog(commandLog.slice(0, 10));
        }
    }

    const startMove = (command) => {
        sendCommand(command);
    }

    const stopMove = () => {
        sendCommand("stop");
    }

    const handleAnalogueChange = (event) => {
        if (event.target.checked) {
            sendCommand("aOn");
        }
        else {
            sendCommand("aOff");
        }
    };

    const handleSliderChange = (event, newValue) => {
        sendCommand("v", newValue.toString());
    }

    const [commandLog, setCommandLog] = useState([]);
    const [logHidden, setLogHidden] = useState(false);

    const toggleLogHidden = () => {
        setLogHidden(!logHidden);
    }

    const [humidity, setHumidity] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [gasLevel, setGasLevel] = useState(null);

    return (
        <div className='robocam'>
            <Grid className='robocam__main' item container xs={12} justify="" spacing={3}>
                <Grid item xs={4} lg={3}>
                    <CommandsPanel
                        disabled={feedHidden}
                        startMove={startMove}
                        stopMove={stopMove}
                        handleSliderChange={handleSliderChange}
                        handleAnalogueChange={handleAnalogueChange}
                        streaming={false}
                    />
                </Grid>
                <Grid item xs={8} lg={5}>
                    <div className='video__container'>
                        <div className='video__buttons'>
                            <Button className='video__button video__button-start' onClick={openVideo}><PlayCircleFilledIcon /> Start video</Button>
                            <Button className='video__button video__button-pause' onClick={pauseVideo}><PauseCircleFilledIcon /> Pause video</Button>
                        </div>
                        <div className='video__feed'>
                            <img id="video-rcv" alt="feed" hidden={feedHidden} />
                            <SensorData
                                hidden={feedHidden}
                                temperature={temperature}
                                humidity={humidity}
                                gasLevel={gasLevel}
                            />
                        </div>
                    </div>
                    <Typography hidden={!feedHidden} variant="h4" className="commands-disabled__tooltip">
                        Command log will be enabled once the streaming component is live.
                    </Typography>
                    {!feedHidden && <CommandHistory hidden={logHidden} toggleLogHidden={toggleLogHidden} commands={commandLog} />}
                </Grid>

            </Grid>
        </div>
    )
}

export default RobocamMainPage;