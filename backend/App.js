const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // need to parse html for post requests
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

//routes

app.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to the Youtube to Mp3 converter API"});
});

app.post("/convert-mp3", async (req, res) => {
  const videoID = req.body.videoID;
  if (videoID == null || videoID == "" || videoID == undefined) {
    return res.status(400).json({
      success: false,
      error: "Please enter a valid video ID",
    });
  } else {
    const fetchApi = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${videoID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );
    const fetchResponse = await fetchApi.json();
    if (fetchResponse.status == "ok") {
      return res.status(200).json({
        success: true,
        title: fetchResponse.title,
        link: fetchResponse.link,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: fetchResponse.error,
      });
    }
  }
});
