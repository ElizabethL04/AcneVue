import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {

  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">

      <div>
            <h2 className="text-2xl font-bold mb-4">Add Image:</h2>

            <input
              type="file"
              onChange={handleChange}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            />

            {file && (
              <img
                src={file}
                alt="Selected Image"
                className="my-image mt-4 rounded shadow-lg"
              />
            )}
      </div>


      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header>*/}
    </div>
  );
}

export default App;
