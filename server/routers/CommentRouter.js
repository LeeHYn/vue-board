const CommentController = require("../controllers/CommentController.js")
const commentRouter = require("express").Router();

commentRouter.post("/comment/createComment",CommentController.commentCreate)
commentRouter.get("/comment/getComment",CommentController.getComment)
module.exports = commentRouter;