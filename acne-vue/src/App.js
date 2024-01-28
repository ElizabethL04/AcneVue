import './App.css';
import React, { useState } from "react";
import * as tf from '@tensorflow/tfjs';
import './model.tflite';

function App() {
  const [file, setFile] = useState();

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
            <button onClick={runInterference}>Run Interference</button>
        </div>
    );
      
};

  return (
    <div className="App  bg-red-100 max-h-screen">
      <div className="text-center flex-col items-center gap-8">

        <div>
          <h1 className="text-6xl font-bold"> AcneVue</h1>
          <h2 className="text-4xl red font-bold mb-4">Add Image:</h2>
        </div>
        
        <div>
          <label
            className="cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block">
            Choose File
            <input
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          {file && (
            <img
              src={file}
              alt="Selected Image"
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
