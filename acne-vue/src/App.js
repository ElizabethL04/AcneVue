import './App.css';
import React, { useState, useRef } from "react";
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './model.tflite';

function App() {
  const [file, setFile] = useState();
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageData = event.target.result;
        setFile(imageData);

        // Store the image data in a global variable
        window.globalImageData = imageData;
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const openCamera = () => {
    setShowWebcam(true);
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFile(imageSrc);

    window.globalImageData = imageSrc;
  }
  const runInterference = async () => {
    const model = await tf.loadLayersModel('model.tflite');
      const input = model.upload(window.globalImageData);
      const prediction = model.pre_result(input);
      prediction.print();

      input.dispose();
      prediction.dispose();
      model.dispose();
  };
  const TFLiteInterference = () => {
    return (
        <div>
            <button className='cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block m-2'
            onClick={runInterference}>Run ML Model</button>
        </div>
    );
      
};

  return (
    <div className="App  bg-red-100 min-h-screen flex flex-col justify-center">
      <div className="text-center flex-col items-center gap-8">

        <div>
          <h1 className="text-6xl font-bold"> AcneVue</h1>
        </div>
        
        <div className='flex justify-center items-center gap-4'>
          <label
            className="cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block m-6">
            Choose File
            <input
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </label>
            <button             
            className='cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block m-6'
            onClick={openCamera}>Open Camera</button>
            </div>
            {showWebcam && (
              <div className='flex items-center justify-center flex-col'>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="my-image mt-4 rounded shadow-lg"
                />
                <button             
                className='cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block m-4'
                onClick={captureImage}>Capture Image</button>
              </div>
            )}

        <div>
          {file && (
            <img
              src={file}
              alt=""
              className="my-image mx-auto rounded shadow-lg w-64 h-auto"
            />
          )}
        </div>
      </div>
      <div>
        <TFLiteInterference />
      </div>
    </div>
      );
      }

    export default App;
