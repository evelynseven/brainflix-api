const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(express.static("./public"));

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
