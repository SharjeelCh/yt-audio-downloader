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
  const [serror,setserror]=useState("");

  useEffect(()=>{
    setError("font-espn text-black tracking-widest")
  },[serror])

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
        className="w-screen flex flex-col justify-center items-center bg-green-600 h-64 py-4 sm:py-16 md:py-20 pl-2 sm:pl-3 md:pl-4"
      >
        <h1 className="font-espn text-4xl text-white italic font-bold pt-36 sm:text-5xl md:text-5xl">
          <FontAwesomeIcon icon={faYoutube} className="text-white-500 h-12 sm:h-10 md:h-12" />{" "}
          YouTube to MP3 Converter
        </h1>
        <h4 className="font-espn text-lg text-white py-3 sm:text-xl py-3 sm:py-4 md:py-5">
          Enter the Youtube video ID
        </h4>
        <div className="bg-white w-72 sm:w-80 md:w-96 ml-3 mr-3 flex flex-row justify-end align-end rounded-lg shadow-sm overflow-visible">
          <input
            name="videoID"
            type="text"
            placeholder="Enter video ID"
            className="flex-grow ml-2 border-none w-64 "
            style={{height:'100%'}}
          ></input>
          <button
            type="submit"
            form="form"
            id="convert-btn"
            className="w-18 tracking-widest font-espn p-1 flex-1 h-full  hover:bg-green-600 hover:text-white hover:rounded-tr-lg hover:rounded-br-lg"
          >
            Convert
          </button>
        </div>
      </form>

      {error ? (
        <div className="w-screen items-center flex flex-col mt-10 sm:mt-12 md:mt-16 px-3 sm:px-4 md:px-4 justify-center align-center">
          <p className={serror}>{e}</p>
        </div>
      ) : (
        <div className="w-screen items-center flex flex-col mt-10 sm:mt-12 md:mt-16 justify-center align-center px-3 sm:px-4 md:px-4">
          <p className="font-espn text-black tracking-widest">{title}</p>
          <a href={link} download>
            <button
              id="download_btn"
              className="w-32 sm:w-36 md:w-40 h-8 sm:h-10 mt-3 tracking-widest rounded-lg bg-green-600 font-espn text-white hover:text-lg"
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
