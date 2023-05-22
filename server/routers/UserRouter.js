const userController = require("../controllers/UserController.js");

const userRouter = require("express").Router();

const {auth} = require("../middlewares/auth")



userRouter.get('/tokenCheck', auth,userController.token)

userRouter.get('/user/logout', userController.logOut);

userRouter.post("/user/addUser", userController.addUser);

userRouter.post("/user/SignInUser",userController.oneUser);

userRouter.post("/user/checkId", userController.checkId);

userRouter.put("/user/updateUser", userController.updateUser);

userRouter.delete("/user/deleteUser", userController.deleteUser);

module.exports = userRouter;
