const db = require("../models");
const BoardPage = db.boards;
require('data-utils')
const getBoards = async (req, res) => {
    try {
        const board = await BoardPage.findAll({
            attributes: ['id', 'boardTitle', 'boardContent', 'createdAt']
        })

        if (board === null) {
            return res.status(400).send('Bed Reqeuest')
        } else {

            return res.send(board)
        }
    } catch (err) {
        console.log(err)
    }

};

const getBoard = async (req, res) => {
    try {
        let id = req.body.id;
        const board = await BoardPage.findOne({
            where: {
                id: id
            }, attributes: ['id', 'boardTitle', 'boardContent', 'createdAt', 'updatedAt']
        })
        return res.send(board)
    } catch (err) {
        console.log(err)
    }

};
//create
const addBoard = async (req, res) => {
    new Date();
    await BoardPage.create({
        boardTitle: req.body.boardTitle,
        boardContent: req.body.boardContent,
    }).then(
        res.send({code: 200})
    )
};

//Update
const updateBoard = async (req, res) => {

    const id = req.body.id;
    //아이디를 비교해서 같을떄에 db에 삽입
    await BoardPage.update(req.body, {where: {id: id}}).then(
        res.send({code: 200})
    ).catch((err) =>
        console.log(err)
    );

};


//Delete
const boardDelete = async (req, res) => {
    console.log(req.body.id)
    await BoardPage.destroy({where: {id: req.body.id}}).then(res.send({code: 200}))
        .catch((err) => console.log(err));
}

module.exports = {
    getBoards,
    getBoard,
    addBoard,
    updateBoard,
    boardDelete
}
