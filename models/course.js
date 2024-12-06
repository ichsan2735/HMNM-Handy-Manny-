'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Category, {
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      })
      Course.belongsToMany(models.User, { through: 'UserCourses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
       })
    }

    formatViews() {
      return this.views.toLocaleString('de-DE')
    }

    static async aggregate(){
      try {
        let data = await Course.findAll({
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'jml'],
            [sequelize.fn('MIN', sequelize.col('views')), 'min'],
            [sequelize.fn('MAX', sequelize.col('views')), 'max']
          ]
        })
        return data

      } catch (error) {
        throw error
      }
    }
  }
  Course.init({
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `course name is required`
        },
        notEmpty: {
          msg: `course name is required`
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `description is required`
        },
        notEmpty: {
          msg: `description is required`
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `duration is required`
        },
        notEmpty: {
          msg: `duration is required`
        }
      }
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `video url is required`
        },
        notEmpty: {
          msg: `video url is required`
        }
      }
    },
    imageUrl: {
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
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    procedure: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `procedure is required`
        },
        notEmpty: {
          msg: `procedure is required`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `category is required`
        },
        notEmpty: {
          msg: `category is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};