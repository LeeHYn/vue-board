const db = require("../models");
const {data} = require("browserslist");
const {Op} = require("sequelize");
const BoardPage = db.boards;


const getBoards = async (req, res) => {
    try {
        const board = await BoardPage.findAll({
            attributes:['boardId','boardTitle','boardContent','createdAt']
        })

        if(board===null){
           return res.status(400).send('Bed Reqeuest')
        }else {

           return res.send(board)
        }
    }catch (err) {
        console.log(err)
    }

};

const getBoard= async (req, res) => {
    try {
        let boardId = req.body.boardId;
        const board = await BoardPage.findOne( {where: {
            [Op.or]: [{ boardId: boardId }],
        }})
            return res.send(board)
    }catch (err) {
        console.log(err)
    }

};
//Update
const updateBoard = async (req, res) => {
    let id = req.params.boardId;
    const user = await BoardPage.update(req.body, {where: {id: id}}).catch((err) =>
        console.log(err)
    );
    res.status(200).send(user);
};

//Delete
const boardDelete = async (req,res)=>{
    try {
        let id = req.params.boardId;
        await BoardPage.destroy({where: {boardId: id}}).catch((err) => console.log(err));
        res.status(200).send("BoardRow is deleted");
    }catch (e){
        console.log(e)
    }
}

module.exports = {
    getBoards,
    getBoard,
    updateBoard,
    boardDelete
}
