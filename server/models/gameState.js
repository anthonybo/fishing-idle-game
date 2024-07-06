'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const GameState = sequelize.define('GameState', {
    fish: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    money: {
      type: DataTypes.FLOAT,
      defaultValue: 10
    },
    rodLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    catchRate: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },
    inventory: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    gameTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  GameState.associate = function(models) {
    GameState.belongsTo(models.User);
  };

  return GameState;
};
