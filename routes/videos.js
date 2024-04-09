const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const fileUrl = path.join(__dirname, "../data/videos.json");

router.get("/", (_req, res) => {
  const videos = JSON.parse(fs.readFileSync(fileUrl));
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videos = JSON.parse(fs.readFileSync(fileUrl));
  const heroVideoId = req.params.id;
  const heroVideo = videos.find((video) => video.id === heroVideoId);
  if (heroVideo) {
    res.json(heroVideo);
  } else {
    return res.status(404).json({ error: "Video not found" });
  }
});

router.post("/newVideo", (req, res) => {
  const videos = JSON.parse(fs.readFileSync(fileUrl));
  const video = req.body;
  console.log(req.body);
  if (video) {
    video.image = "http://localhost:8080/images/Upload-video-preview.jpg";
    videos.unshift(video);
    fs.writeFileSync(fileUrl, JSON.stringify(videos));
    res.json(video);
  } else {
    return res.status(400).json({ error: "Video not exist" });
  }
});

router.post("/:id/comments", (req, res) => {
  const videos = JSON.parse(fs.readFileSync(fileUrl));
  const heroVideoId = req.params.id;
  const comment = req.body;
  const heroVideo = videos.find((video) => video.id === heroVideoId);
  if (!heroVideo) {
    return res.status(404).json({ error: "Video not found" });
  }
  heroVideo.comments.push(comment);
  fs.writeFileSync(fileUrl, JSON.stringify(videos));
  res.json(comment);
});

router.delete("/:videoId/comments/:commentId", (req, res) => {
  const videos = JSON.parse(fs.readFileSync(fileUrl));
  const heroVideoId = req.params.videoId;
  const commentId = req.params.commentId;
  const heroVideo = videos.find((video) => video.id === heroVideoId);
  if (!heroVideo) {
    return res.status(404).json({ error: "Video not found" });
  }
  const deletedComment = heroVideo.comments.find(
    (comment) => comment.id === commentId
  );

  videos.find((video) => video.id === heroVideoId).comments = videos
    .find((video) => video.id === heroVideoId)
    .comments.filter((comment) => comment.id !== commentId);

  fs.writeFileSync(fileUrl, JSON.stringify(videos));

  res.json(deletedComment);
});

module.exports = router;
