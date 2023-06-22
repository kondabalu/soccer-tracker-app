const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();




mongoose.connect('mongodb+srv://balubp:6IXoEJ6PQ7IFNDZo@cluster-soccertracker.81mxens.mongodb.net/soccertracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database!');
  })
  .catch(() => {
    console.log('connection failed! ');
  });

const SoccerTracker = require('./models/playerProfile');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
    "HTTP/1.1 200 OK",
    "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS,PUT"
  );
  next();
});

app.get("/api/soccer-tracker/profiles", (req, res, next) => {
  SoccerTracker.find().then(profiles => {
    res.status(200).json({
      message: "Profiles are found",
      posts: profiles
    });
    console.log(profiles);
  });
});

app.post("/api/soccer-tracker/save", (req, res, next) => {
  const soccerTracker = new SoccerTracker({
    playername: req.body.playername,
    clubname: req.body.clubname,
    youthclub: req.body.youthclub,
    position: req.body.position,
    goals: req.body.goals,
    assists: req.body.assists,
    yellowcards: req.body.yellowcards,
    redcards: req.body.redcards,
    tackles: req.body.tackles,
    saves: req.body.saves,
    dateOfBirth: req.body.dateOfBirth
  });
  soccerTracker.save().then(createdProfile => {
    res.status(201).json({
      message: 'Player Profile Added Successfully',
      posts: createdProfile
    });
    console.log(res.message);
  });

});

app.put("/api/soccer-tracker/update/:id", (req, res, next) => {
  const soccerTracker = new SoccerTracker({
    _id: req.body._id,
    playername: req.body.playername,
    clubname: req.body.clubname,
    youthclub: req.body.youthclub,
    position: req.body.position,
    goals: req.body.goals,
    assists: req.body.assists,
    yellowcards: req.body.yellowcards,
    redcards: req.body.redcards,
    tackles: req.body.tackles,
    saves: req.body.saves,
    dateOfBirth: req.body.dateOfBirth
  });
  SoccerTracker.updateOne({ _id: req.params.id }, soccerTracker).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update Successful !" });
  });
});

app.get("/api/soccer-tracker/profiles/:id", (req, res, next) => {
  SoccerTracker.findById(req.params.id).then(profile => {
    if (profile) {
      console.log(profile);
      res.status(200).json({
        message: 'Profile found!',
        posts: profile
      });
    } else {
      res.status(200).json({ message: 'profile not found' });
    }
  });
});

app.get("/api/soccer-tracker/profile-byname/:playername", (req, res, next) => {
  SoccerTracker.find({ playername: req.params.playername }).then(profile => {
    if (profile) {
      console.log(profile);
      res.status(200).json({
        message: 'Profile found!',
        posts: profile
      });
    } else {
      res.status(200).json({ message: 'profile not found' });
    }
  });
});

app.get("/api/soccer-tracker/goals", (req, res, next) => {
  SoccerTracker.find()
    .sort({ goals: -1 })
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles are found",
        posts: profiles
      });
      console.log(profiles);
      console.log("Sorted by Goals in Descending order");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/soccer-tracker/assists", (req, res, next) => {
  SoccerTracker.find()
    .sort({ assists: -1 })
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles are found",
        posts: profiles
      });
      console.log(profiles);
      console.log("Sorted by Assists in Descending order");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/soccer-tracker/yellowcards", (req, res, next) => {
  SoccerTracker.find()
    .sort({ yellowcards: 1 })
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles are found",
        posts: profiles
      });
      console.log(profiles);
      console.log("Sorted by Yellow cards in Ascending order");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/soccer-tracker/redcards", (req, res, next) => {
  SoccerTracker.find()
    .sort({ redcards: 1 })
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles are found",
        posts: profiles
      });
      console.log(profiles);
      console.log("Sorted by Redcards in Ascending order");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/soccer-tracker/tackles", (req, res, next) => {
  SoccerTracker.find()
    .sort({ tackles: -1 })
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles are found",
        posts: profiles
      });
      console.log(profiles);
      console.log("Sorted by Tackles in Descending order");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/soccer-tracker/saves", (req, res, next) => {
  SoccerTracker.find()
    .sort({ saves: -1 })
    .then((profiles) => {
      res.status(200).json({
        message: "Profiles are found",
        posts: profiles
      });
      console.log(profiles);
      console.log("Sorted by Saves in Descending order");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.delete("/api/soccer-tracker/delete/:id", (req, res, next) => {
  SoccerTracker.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Profile deleted!' });
  });
});

module.exports = app;
