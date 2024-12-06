'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Profile.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `fullname is required`
        },
        notEmpty: {
          msg: `fullname is required`
        }
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `image url is required`
        },
        notEmpty: {
          msg: `image url is required`
        }
      }
    },
    interest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `interest is required`
        },
        notEmpty: {
          msg: `interest is required`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};