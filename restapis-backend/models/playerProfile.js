const mongoose = require('mongoose');

const soccerTracker = mongoose.Schema({
    playername: { type: String, require: true },
    clubname: { type: String, require: true },
    youthclub: { type: String, require: true },
    position: { type: String, require: true },
    goals: { type: Number, require: true },
    assists: { type: Number, require: true },
    yellowcards: { type: Number, require: true },
    redcards: { type: Number, require: true },
    tackles: { type: Number, require: true },
    saves: { type: Number, require: true },
    dateOfBirth: { type: String, require: true }
})

module.exports = mongoose.model('SoccerTracker', soccerTracker);