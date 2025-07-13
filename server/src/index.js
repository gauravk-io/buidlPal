const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Challenge = require('./models/Challenge');


const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON in request body

// Test GET route
app.get('/', (req, res) => {
  res.send('Server is working');
});

// New POST route for joining a challenge
app.post('/api/challenges', async (req, res) => {
  const { name, idea } = req.body;

  if (!name || !idea) {
    return res.status(400).json({ error: 'Name and challenge idea are required' });
  }

  try {
    const newChallenge = new Challenge({ name, idea });
    await newChallenge.save();

    res.status(201).json({ message: 'Challenge saved', id: newChallenge._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save challenge' });
  }
});

app.get('/api/challenges/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch challenge' });
  }
});

app.patch('/api/challenges/:id/join', async (req, res) => {
  const { opponent } = req.body;

  if (!opponent) {
    return res.status(400).json({ error: 'Opponent name is required' });
  }

  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    if (challenge.opponent) {
      return res.status(400).json({ error: 'Challenge already has two players' });
    }

    challenge.opponent = opponent;
    await challenge.save();

    res.status(200).json({ message: 'Joined successfully', challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join challenge' });
  }
});



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
