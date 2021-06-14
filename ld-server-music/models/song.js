'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title cannot be empty"
        },
        notEmpty: {
          msg: "Title cannot be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId cannot be empty"
        },
        notEmpty: {
          msg: "UserId cannot be empty"
        }
      }
    },
    lyric: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lyric cannot be empty"
        },
        notEmpty: {
          msg: "Lyric cannot be empty"
        }
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Artist cannot be empty"
        },
        notEmpty: {
          msg: "Artist cannot be empty"
        }
      }
    }
  }, {})
  Song.associate = function(models) {
    Song.belongsTo(models.User)
  }
  return Song
}