'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      db.boards.hasMany(db.comments,{foreignKey : 'board_commenter' , sourceKey : 'id'})
      db.boards.hasMany(db.comment_relations,{foreignKey : 'board_comment' , sourceKey : 'id'})
    }
  }
  Board.init({
    boardTitle: DataTypes.STRING,
    boardContent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};