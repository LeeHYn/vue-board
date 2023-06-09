'use strict';
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
    // eslint-disable-next-line no-unused-vars
    static associate(db) {
      // 🎈이곳에서 관계를 설정합니다
      db.users.hasMany(db.comments,{foreignKey : 'name' , sourceKey : 'userId'})
    }
  }
  User.init({
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    createdAt:"TIMESTAMP",
    updatedAt:"TIMESTAMP",
    refresh: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};