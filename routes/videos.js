const { log } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const fileUrl = path.join(__dirname, "../data/videos.json");
const videosData = fs.readFileSync(fileUrl);
const videos = JSON.parse(videosData);

router.get("/", (req, res) => {
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const heroVideoId = req.params.id;
  const heroVideo = videos.find((video) => video.id === heroVideoId);
  if (heroVideo) {
    res.json(heroVideo);
  } else {
    return res.status(404).json({ error: "Video not found" });
  }
});

router.post("/:id/comments", (req, res) => {
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
  res.json(deletedComment);
});

module.exports = router;
