'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      User.belongsToMany(models.Course, { through: 'UserCourses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
       })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `username is required`
        },
        notEmpty: {
          msg: `username is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `email is required`
        },
        notEmpty: {
          msg: `email is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password is required`
        },
        notEmpty: {
          msg: `password is required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, option) => {        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    }
  });
  return User;
};