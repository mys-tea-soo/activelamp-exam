const express = require("express");
const cors = require("cors");
const app = express();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/*  "/api/status"
*   GET: Get server status
*   PS: it's just an example, not mandatory
*/
app.get("/api/url", function (req, res) {
  res.status(200).json({ status: "UPs" });
});