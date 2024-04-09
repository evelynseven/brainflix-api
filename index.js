const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/videos", videoRoutes);

app.listen("8080", () => {
  console.log("Server is listening on 8080...");
});
