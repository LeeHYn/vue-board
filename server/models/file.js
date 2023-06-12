'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(db) {
            // 🎈이곳에서 관계를 설정합니다
            File.belongsTo(db.users, { foreignKey: 'userId', targetKey: 'id' });
        }
    }
    File.init({
        fileName: DataTypes.STRING,
        fileType: DataTypes.STRING,
        fileSize: DataTypes.INTEGER,
        filePath: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'File',
        tableName: 'Files'
    });
    return File;
};