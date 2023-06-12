const userController = require("../controllers/UserController.js");

const userRouter = require("express").Router();




userRouter.get('/tokenCheck', userController.check)

userRouter.get('/user/logout', userController.logOut);

userRouter.post("/user/addUser", userController.addUser);

userRouter.post("/user/SignInUser",userController.oneUser);

userRouter.post("/user/checkId", userController.checkId);

userRouter.put("/user/updateUser", userController.updateUser);

userRouter.delete("/user/deleteUser", userController.deleteUser);

module.exports = userRouter;
