'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comment_relations', {
                cid: {
                    type: Sequelize.INTEGER(11),
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                parents_comment: {
                    type: Sequelize.INTEGER(11),
                    defaultValue:0,
                    allowNull: false,
                },
                child_comment: {
                    type: Sequelize.INTEGER(11),
                    defaultValue:0,
                },
                board_comment: {
                    type: Sequelize.INTEGER(11),
                    allowNull: false,
                },
                myNum: {
                    type: Sequelize.INTEGER(11),
                    allowNull: false,
                }
            },{ timestamps: false }
        )

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Comments_relation');
    }
};
