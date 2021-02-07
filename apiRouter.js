const express = require("express");
const user = require("./routes/user");
const verifyToken = require("./services/verifyToken");

exports.router = (function () {
  let apiRouter = express.Router();
  // register user
  apiRouter.route("/register").post(user.register);

  // connection user
  apiRouter.route("/login").post(user.logIn);

  // deconnection user
  apiRouter.route("/logout").post(user.logOut);

  /*   // reconnect user
    apiRouter.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  /*  apiRouter.route("/info").get(verifyToken, user.myInfo);
 
   // info user
   apiRouter.route("/info/:id").get(verifyToken, user.infoUser);
 
   // edit profile
   apiRouter.route("/edit").put(verifyToken, user.editUser);
 
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  return apiRouter;
})();