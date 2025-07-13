const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idea: {
        type: String,
        required: true,
    },
    opponent: {
        type: String,
        default: null, // will be filled when second person joins
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
