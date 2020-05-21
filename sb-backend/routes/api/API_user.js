// should contain all the "get routes" to view most user/class/session specific data
// and the create/delete routes for sessions as these will be user created

const router = require("express").Router();
const userController = require("../../controllers/userController");
const sessionController = require("../../controllers/sessionController");
const locationController = require("../../controllers/locationController");
const classController = require("../../controllers/classController");

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findUser)
  .put(userController.update)

// Matches with "/api/class"
router
  .route("/all/:id/classes")
  .get(classController.findAllClasses)

// Matches with "/api/session"
router
  .route("/:userid/session")
  .get(sessionController.findAllSessions)

router
  .route("/:userid/session/:sessionid")
  .put(sessionController.joinSession)

router
  .router("/:userid/session/hosting")
  .get(sessionController.findAllAsHost)
  .post(sessionController.create)
  .delete(sessionController.remove)
  .put(sessionController.update)

router
  .router("/:classid/session")
  .get(sessionController.findAllForClass)

router
  .route("/locations")
  .get(locationController.findAll)
 
router
  .route("/location/:sessionid") 
  .get(locationController.findOne)

router
  .route("/session/:id")
  .get(locationController.findSessionById)

router
  .route("/api/user", passport.authenticate("local"))
  .put(userController.authenticateUser)    

//   app.put("/api/user", passport.authenticate("local"), function (req, res) {
//     db.User.findOne({
//         where: {
//             username: req.body.username,
//             password: req.body.password
//         }

//     }).then(function (dbUser) {
//         console.log("passport checking user...")
//         // console.log(req.user);
//         // Added Passport logic for validating user
//         if (req.user) {
//             console.log("true");
//             // console.log(dbUser);
//             res.json(dbUser);
//         }
//         else { res.sendFile("/html/login.html", { root: path.join(__dirname, "../public") }) };
//     });
// })


module.exports = router;
