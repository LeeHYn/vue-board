const BoardRouter = require("../controllers/BoardController.js")
const boardRouter = require("express").Router();

boardRouter.get("/board/getBoards", BoardRouter.getBoards);
boardRouter.post("/board/getBoard",BoardRouter.getBoard);
boardRouter.delete("/board/boardDelete",BoardRouter.boardDelete)
module.exports = boardRouter;
