import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [error, setError] = useState(false);
  const [e, setE] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [pData, setPData] = useState([]);
  const [serror, setserror] = useState("");

  useEffect(() => {
    setserror("font-espn text-black tracking-widest animation-shake");
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("form submitted");
    const formData = new FormData(event.target);
    const videoID = event.target.videoID.value;
    if(videoID==""){
      setError(true);
      setE("Please enter a valid video ID.");
      return;
    }

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
        console.log("link: ", link);
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
    <div className="h-screen flex flex-col w-full">
      <form
        action="/convert-mp3"
        method="POST"
        id="form"
        onSubmit={handleSubmit}
        className="w-screen flex flex-col justify-center items-center bg-red-600 h-56 sm:h-64 md:h-72 py-4 sm:py-16 md:py-20 px-2 sm:px-3 md:px-4 rounded-br-xl sm:rounded-br-2xl md:rounded-br-3xl rounded-bl-xl sm:rounded-bl-2xl md:rounded-bl-3xl"
      >
        <h1 className="font-espn text-2xl text-white italic font-bold pt-36 sm:text-3xl md:text-4xl">
          <FontAwesomeIcon
            icon={faYoutube}
            className="text-white-500 h-8 sm:h-10 md:h-12"
          />{" "}
          YouTube to MP3 Converter
        </h1>
        <h4 className="font-espn text-base text-white sm:text-sm md:text-lg py-2 sm:py-5 md:py-7">
          Enter the Youtube video ID
        </h4>
        <div className="bg-white w-[250px] sm:w-[350] md:w-[400px] mx-3 sm:mx-4 md:mx-4 flex flex-row justify-end align-end items-stretch rounded-lg shadow-xl bg-white">
          <input
            name="videoID"
            type="text"
            placeholder="Enter video ID"
            spellCheck
            className="flex-grow rounded-md sm:rounded-md md:rounded-lg border-none w-48 sm:w-56 md:w-64 p-1 sm:p-2 md:p-3"
            style={{ height: "100%" }}
          ></input>
          <button
            type="submit"
            form="form"
            id="convert-btn"
            className="w-18 tracking-widest font-espn p-1 flex-1 h-full rounded-br-lg rounded-tr-lg  hover:bg-red-600 hover:text-white hover:rounded-tr-lg hover:rounded-br-lg transition-colors active:bg-red-500"
          >
            Convert
          </button>
        </div>
      </form>

      {error || link=="" ? (
        <div className="w-screen items-center flex flex-col mt-10 sm:mt-12 md:mt-16 px-3 sm:px-4 md:px-4 justify-center align-center">
          <p className={serror}>{e}</p>
        </div>
      ) : (
        <div className="w-screen items-center flex flex-col mt-10 sm:mt-12 md:mt-16 justify-center align-center px-3 sm:px-4 md:px-4">
          <p className="font-espn text-black tracking-widest">{title}</p>
          <a href={link} download className="shadow-xl bg-white">
            <button
              id="download_btn"
              className="w-32 sm:w-36 md:w-40 h-10 sm:h-12 md:h-14 mt-3 tracking-widest rounded-sm sm:rounded-md md:rounded-lg bg-red-600 hover:bg-red-500 font-espn text-white transition-colors active:bg-red-400"
            >
              Download
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
