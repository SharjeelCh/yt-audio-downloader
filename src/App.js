import { useState } from "react";
import "./App.css";

function App() {

  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
   

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const videoID = formData.get("videoID");

    try {
      const response = await fetch("/convert-mp3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoID }),
      });
      const data = await response.json();

      if (data.success) {
        setTitle(data.title);
        setLink(data.link);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    }
  };


  return (
    <div className="App">
      <form action="convert-mp3" method="POST" id="form" onSubmit={handleSubmit}>
      <h1>
        <i className="fab fa youtube"></i>Youtube to Mp3 Converter
      </h1>
      <h4>Enter the Youtube video ID</h4>
      <div id="second">
        <input name="videoID" type="text" placeholder="Enter video ID"></input>
        <button type="submit" form="form" id="convert-btn">
          Convert
        </button>
      </div>
      {error ? (
        <div id="error">
          <p>error</p>
        </div>
      ) : (
        <div id="success">
          <p>{title}</p>
          <a href="">
            <button id="download_btn">Download</button>
          </a>
        </div>
      )}
      </form>
    </div>
  );
}

export default App;
