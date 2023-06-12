const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.set("port", process.env.PORT || 8081);
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

const userRouter = require("./routers/UserRouter.js");
const boardRouter = require("./routers/BoardRouter")
const commentRouter = require("./routers/CommentRouter")
const fileRouter = require("./routers/file")
app.use("/api", userRouter);
app.use("/api",boardRouter)
app.use("/api",commentRouter)
app.use("/api",fileRouter)
app.listen(app.get("port"), () => {
  const dir = "./uploads";
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log(app.get("port"), "번 포트에서 대기 중");
});
