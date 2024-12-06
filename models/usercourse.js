'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserCourse.belongsTo(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      UserCourse.belongsTo(models.Course, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  UserCourse.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `user is required`
        },
        notEmpty: {
          msg: `user is required`
        }
      }
    },
    CourseId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `course is required`
        },
        notEmpty: {
          msg: `course is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};