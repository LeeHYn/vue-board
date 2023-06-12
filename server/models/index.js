const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require("../config/config.json")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

const User = require("./User.js")(sequelize, DataTypes);
const Board = require("./Board.js")(sequelize, DataTypes);
const Comment = require("./Comment.js")(sequelize, DataTypes);
const Comment_relations = require("./Comment_relations.js")(sequelize, DataTypes);
const File = require("./File.js") (sequelize, DataTypes);

db.users = User;
db.boards = Board;
db.comments = Comment;
db.comment_relations = Comment_relations;
db.files = File

User.associate(db)
Board.associate(db)
Comment.associate(db)
Comment_relations.associate(db)
File.associate(db)
module.exports = db;
