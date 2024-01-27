import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import styles from "./index.css"

function App() {

  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
  }

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
