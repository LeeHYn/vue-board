'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment_relations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(db){
            db.comment_relations.belongsTo(db.boards,{foreignKey : 'board_commenter' , targetKey : 'id'});
            db.comment_relations.belongsTo(db.comments,{foreignKey : 'myNum' , targetKey : 'id'});
        }
    }
    Comment_relations.init({
        cid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        parents_comment: DataTypes.INTEGER,
        child_comment: DataTypes.INTEGER,
        myNum:DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Comment_relations',
        timestamps:false
    });
    return Comment_relations;
}
;