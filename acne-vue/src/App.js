import React, { useState } from "react";
import "./App.css"; // Assuming you have additional styles in App.css
import styles from "./index.css";

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

    </div>
  );
}

export default App;
