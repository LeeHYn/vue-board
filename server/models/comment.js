'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // 🎈이곳에서 관계를 설정합니다
      db.comments.belongsTo(db.users,{foreignKey : 'name' , targetKey : 'userId'});
      db.comments.hasMany(db.comment_relations,{foreignKey : 'myNum' , sourceKey : 'id'})
    }
  }
  Comment.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    board_commenter:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
}
;