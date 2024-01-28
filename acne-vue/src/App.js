import React, { useState, useRef, useEffect} from "react";
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

function ResultComponent({ maxIndex, onClick }) {
  let skinCondition;

  if (maxIndex === 0) {
    skinCondition = 'Blackheads';
  } else if (maxIndex === 1) {
    skinCondition = 'Cyst';
  } else if (maxIndex === 2) {
    skinCondition = 'Papule';
  }
  else if (maxIndex === 3) {
    skinCondition = 'Pustule';
  }
  else if (maxIndex === 4) {
      skinCondition = 'Whiteheads';
  } else {
    skinCondition = 'Unknown Condition';
  }

  return (
    <div>
      <h2>Results</h2>
      <p>{`Index of Max Value: ${maxIndex}`}</p>
      <p>{`Skin Condition: ${skinCondition}`}</p>
    </div>
  );
}

function App() {
  const [file, setFile] = useState();
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [indexOfMaxValue, setIndexOfMaxValue] = useState(null);

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageData = event.target.result;
        setFile(imageData);
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
  }

  const runInterference = async () => {

    const formData = new FormData();
    formData.append('file', dataURItoBlob(file));

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Predictions:', result.predictions);

        const dataArray =result.predictions[0];
        setPredictions(dataArray)
        //find the index of with largest value
        
        const newIndexOfMaxValue = dataArray.indexOf(Math.max(...dataArray));
        setIndexOfMaxValue(newIndexOfMaxValue);

        console.log("Index with the largest value:", newIndexOfMaxValue);

      } else {
        console.error('Error predicting. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="App">
      <div className="text-center flex-col items-center gap-8">
        <div>
          <h1 className="text-6xl font-bold"> AcneVue</h1>
          <h2 className="text-4xl red font-bold mb-4">Add Image:</h2>
        </div>

        <div>
          <label className="cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block">
            Choose File
            <input type="file" onChange={handleChange} className="hidden" />
          </label>
        </div>

        <div>
          <button onClick={openCamera}>Open Camera</button>
          {showWebcam && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="my-image mt-4 rounded shadow-lg"
              />
              <button onClick={captureImage}>Capture Image</button>
            </>
          )}
        </div>

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
        <button onClick={runInterference}>Run Interference</button>
      </div>

      {predictions.length > 0 && (
        <ResultComponent
          maxIndex={indexOfMaxValue} // Pass the index of the maximum value
          onClick={() => setPredictions([])} 
        />
      )}

      
    </div>
  );
}

export default App;
