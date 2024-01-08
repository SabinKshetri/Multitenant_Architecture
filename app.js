const express = require("express");
const app = express();

app.set("view engine", "ejs");

//parsing data from ejs form

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routing here
const orgRoute=require('./Routes/OrganizatonRoutes/OrganizationRoutes')



app.use("",orgRoute)


//Requires here
require("dotenv").config();
const passport = require("passport");

const { users } = require("./Model/index");
const generateToken = require("./services/generateToken");

//middlewares and configuration for the google login
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//google login here
var userProfile;
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get( "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  async function (req, res) {
    console.log(userProfile, "userprofile");
    const userGoogleEmail = userProfile.emails[0].value;
    const user = await users.findOne({
      where: {
        email: userGoogleEmail,
      },
    });
    if (user) {
      const token = generateToken(user);
      res.cookie("token", token);
     
    res.redirect("/addOrganization");
    } else {
      await users.create({
        email: userGoogleEmail,
        googleId: userProfile.id,
        username: userProfile.displayName,
      });
     
      res.send("logged in successfully!!!");
    
    }

   
  }
);

//google login ends here

//database
require("./Model/index");

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Project Running in PORT:${PORT}`);
});
