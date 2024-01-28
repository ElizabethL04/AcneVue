<<<<<<< HEAD
import './App.css';
import React, { useState } from "react";
import * as tf from '@tensorflow/tfjs';
import './model.tflite';
=======
import React, { useState } from "react";
import "./App.css"; // Assuming you have additional styles in App.css
import styles from "./index.css";
>>>>>>> a429d57a5ab3d4b9f3537038933f098625b56534

function App() {
  const [file, setFile] = useState();

<<<<<<< HEAD
  const handleChange = (e) => {
=======
  function handleChange(e) {
>>>>>>> a429d57a5ab3d4b9f3537038933f098625b56534
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
<<<<<<< HEAD
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
      <div className="text-center">
        <h1 className="text-6xl font-bold"> AcneVue</h1>
        <h2 className="text-4xl red font-bold mb-4">Add Image:</h2>
        <label
          className="cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block"
        >
          Choose File
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {file && (
          <img
            src={file}
            alt="Selected Image"
            className="my-image mt-4 rounded shadow-lg"
          />
        )}
      </div>
      <div>
        <TFLiteInterference />
      </div>
=======
  }

  return (
    <div className="App bg-red-100 h-screen p-8">

      <div className="text-center flex-col items-center gap-8">

        <div>
          <h1 className="text-6xl font-bold mb-8">AcneVue</h1>
          <h2 className="text-4xl text-red-400 mb-4">Add Image:</h2>
        </div>

        <div>
          <label
            className="cursor-pointer bg-red-300 text-white py-2 px-4 rounded inline-block"
          >
            Choose File
            <input
              type="file"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="self-center align-middle mt-8">
          {file && (
            <img
              src={file}
              alt="Selected Image"
              className="my-image mx-auto rounded shadow-lg w-64 h-auto"
            />
          )}
        </div>
      </div>

>>>>>>> a429d57a5ab3d4b9f3537038933f098625b56534
    </div>
  );
}

export default App;
