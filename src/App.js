import { useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(false);
  const [e, setE] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [pData, setPData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form submitted");
    const formData = new FormData(event.target);
    const videoID = event.target.videoID.value;

    try {
      const response = await fetch("http://localhost:8000/convert-mp3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoID }),
      });
      if (!response.ok) {
        throw new Error("Server responded with error");
      }

      const data = await response.json();
      console.log(data);
      setPData([...pData, data]);

      if (data.success) {
        setTitle(data.title);
        setLink(data.link);
        console.log("link: ",link);
        setError(false);
      } else {
        setError(true);
        setE(data.error || "An error occurred while processing the request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
      setE("Network error or server error. Please try again later."); // Set a generic error message for network/server issues
    }
  };

  return (
    <div className="App">
      <form
        action="/convert-mp3"
        method="POST"
        id="form"
        onSubmit={handleSubmit}
      >
        <h1>
          <i className="fab fa youtube"></i>Youtube to Mp3 Converter
        </h1>
        <h4>Enter the Youtube video ID</h4>
        <div id="second">
          <input
            name="videoID"
            type="text"
            placeholder="Enter video ID"
          ></input>
          <button type="submit" form="form" id="convert-btn">
            Convert
          </button>
        </div>
        </form>

        {error ? (
          <div id="error">
            <p>{e}</p>
          </div>
        ) : (
          <div id="success">
            <p>{title}</p>
            <a href={link} download>
              <button id="download_btn">Download</button>
            </a>
          </div>
        )}
    </div>
  );
}

export default App;
