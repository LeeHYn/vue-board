const db = require("../models");
const {sequelize} = require("../models");
const {QueryTypes} = require("sequelize");
const Comments = db.comments;
const Comment_relations = db.comment_relations;

//commentcreate
const commentCreate = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.parents_comment === 0) {
            const comment = await Comments.create({
                name: req.body.userId,
                board_commenter: req.body.id,
                content: req.body.content,
            });
            await Comment_relations.create({
                board_comment: req.body.id,
                myNum: comment.id,
                parents_comment: 0,
                child_comment: 0
            });
            console.log("OK");
            return res.send({code: 200});
        } else if (req.body.parents_comment !== 0) {
            const parents_comment = req.body.parents_comment;

            const query = `SELECT * FROM comment_relations WHERE myNum = :parents_comment`;
            const comments_rela = await sequelize.query(query, {replacements: {parents_comment: parents_comment}}, {type: QueryTypes.SELECT});

            if (comments_rela) {
                const comment = await Comments.create({
                    name: req.body.userId,
                    board_commenter: req.body.id,
                    content: req.body.content,
                });
                await Comment_relations.create({
                    board_comment: req.body.id,
                    myNum: comment.id,
                    parents_comment: req.body.parents_comment,
                    child_comment: 0
                });
                await Comment_relations.update({child_comment: comment.id}, {
                    where: {
                        myNum: parents_comment,
                    }
                });
            }
            console.log("OK");
            return res.send({code: 200});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({error: 'Something went wrong'});
    }
}

const getComment = async (req, res) => {
    try {
        const {id} = req.query
        console.log(id)
        const query = `SELECT DISTINCT *
                       FROM comments
                                JOIN comment_relations ON id = myNum
                       WHERE board_commenter = :id AND board_comment = :id`
        const commenter = await sequelize.query(query, {replacements: {id: id}}, {type: QueryTypes.SELECT})
        console.log(commenter)
        return res.send(commenter)
    } catch (err) {
        console.log(err)
    }
};


module.exports = {
    commentCreate,
    getComment,
};