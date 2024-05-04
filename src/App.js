import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

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
    <div className="h-screen flex flex-wrap">
      <form
        action="/convert-mp3"
        method="POST"
        id="form"
        onSubmit={handleSubmit}
        className="w-screen flex flex-col justify-center items-center bg-green-600 h-60"
      >
        <h1 className="font-espn text-4xl text-white italic font-bold pt-36">
          <FontAwesomeIcon icon={faYoutube} className="text-white-500 h-10" /> YouTube to MP3 Converter
        </h1>
        <h4 className="font-espn text-lg text-white py-5">Enter the Youtube video ID</h4>
        <div className="bg-white w-80 h-48 flex flex-row justify-end rounded-lg shadow-sm">
          <input
            name="videoID"
            type="text"
            placeholder="Enter video ID"
            className="ml-2 border-none"
          ></input>
          <button type="submit" form="form" id="convert-btn" className="w-20 font-espn p-1 flex-1 h-full  hover:bg-green-600 hover:text-white hover:rounded-tr-lg hover:rounded-br-lg">
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
