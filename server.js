//server related
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const server = app.listen(PORT, () =>
  console.log(`Eyes on port ${PORT} ` + "http://localhost:3000/")
);
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, "./client")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});
