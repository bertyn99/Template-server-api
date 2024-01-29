import { Router } from "express";
import User from "./controllers/user.js";
import verifyToken from "./services/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();

  //healthCheck
  apiRouter.get("/", (req, res) => {
    res.send("API is running");
  });
  // register user
  apiRouter.route("/register").post(User.register);

  // connection user
  apiRouter.route("/login").post(User.logIn);

  // deconnection user
  /* apiRouter.route("/logout").post(verifyToken, User.logOut); */

  /*   // reconnect user
    apiRouter.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiRouter.route("/user/:id").get(verifyToken, User.myInfo);

  // edit profile
  apiRouter.route("/user/:id/edit").patch(verifyToken, User.updateInfo);

  /*  
 
   // info user
   apiRouter.route("/info/:id").get(verifyToken, user.infoUser);
 
   
 
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  return apiRouter;
})();
