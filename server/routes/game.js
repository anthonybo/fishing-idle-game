const express = require('express');
const jwt = require('jsonwebtoken');
const { User, GameState } = require('../models');

const router = express.Router();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

router.get('/state', auth, async (req, res) => {
  try {
    let gameState = await GameState.findOne({ where: { UserId: req.userId } });
    if (!gameState) {
      gameState = await GameState.create({
        UserId: req.userId,
        fish: 0,
        money: 10,
        rodLevel: 1,
        catchRate: 1,
        inventory: {},
        gameTime: 0 // Initialize gameTime to 0
      });
    }
    res.send(gameState);
  } catch (error) {
    console.error('Error fetching game state:', error);
    res.status(500).send({ error: 'Server error', details: error.message });
  }
});

router.post('/save', auth, async (req, res) => {
  try {
    const { inventory, fish, money, rodLevel, catchRate, gameTime } = req.body;
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const [gameState, created] = await GameState.findOrCreate({
      where: { UserId: req.userId },
      defaults: { inventory, fish, money, rodLevel, catchRate, gameTime, UserId: req.userId }
    });

    if (!created) {
      await gameState.update({ inventory, fish, money, rodLevel, catchRate, gameTime });
    }

    res.send(gameState);
  } catch (error) {
    console.error('Error saving game state:', error);
    res.status(400).send({ error: 'Error saving game state', details: error.message });
  }
});



module.exports = router;