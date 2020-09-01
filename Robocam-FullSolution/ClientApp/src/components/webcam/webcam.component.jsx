import React from 'react';

import Webcam from 'react-webcam';
import * as signalR from '@aspnet/signalr';

const WebcamCapture = (props) => {

  const signalRController = (() => {

    const connection = new signalR.HubConnectionBuilder().withUrl("/centralHub").build();
    let isWorking = false;

    connection.start().then(function () {
      isWorking = true;
    }).catch(function (err) {
      return console.error(err.toString());
    });

    // //listen to new commands and print them
    // connection.on("ReceiveCommand", message => document.querySelector('.commands').insertAdjacentHTML('afterbegin', `<p>${message}</p>`));

    return {
      sendMessage: (message) => {
        connection.invoke("SendCommand", message).then(() => console.log(`Message sent with content: ${message}`));
      },
      sendImage: (message) => {
        connection.invoke("SendImage", message);
      }
    }

  })();


  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setImgSrc(imageSrc);

    signalRController.sendImage(JSON.stringify(imageSrc));
  }, [webcamRef, setImgSrc]);

  setInterval(() => {
    capture();
  }, 100);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"

      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc}
          alt="sc"
        />
      )}
    </>
  );
};

export default WebcamCapture;