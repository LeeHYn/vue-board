const db = require("../models");
const { Op } = require("sequelize");
const User = db.users;
const jwt = require("../models/jwt")





//nameCheck
const checkId = async (req,res) =>{
    try{
        let userId = req.body.id;
        const user = await User.findOne({
            where: {
                [Op.or]: [{ userId: userId }],
            },
        });
        console.log(res.json)
        if (user === null) {
            return  res.send({code:200})
        } else {
            return res.send({code:404});
        }
    }catch (err){
        console.log(err)
    }

}

//create
const addUser = async (req, res) => {
    let info = {
        name: req.body.name,
        userId:req.body.id,
        password: req.body.password,
    };
    const user = await User.create(info).then(res.send({code: 200})).catch((err) => {
        res.send({code: 401})
        console.log(err)
    });
};

const oneUser = async (req, res ) => {
    let userId = req.body.userId;
    let password = req.body.password;

    // eslint-disable-next-line no-useless-catch
    try {
       const user = await User.findOne({where: {userId: userId, password: password}})
        const jwtToken = await jwt.sign(user);
        return res.send({
            /* 생성된 Token을 클라이언트에게 Response */
            code:200,
            token: jwtToken.token
        })
    }catch (err){
        throw err
    }


};
//update

const updateUser = async (req, res) => {
    let id = req.params.id;
    const user = await User.update(req.body, {where: {id: id}}).catch((err) =>
        console.log(err)
    );
    res.status(200).send(user);
};

//delete

const deleteUser = async (req, res) => {
    let id = req.params.id;
    await User.destroy({where: {id: id}}).catch((err) => console.log(err));
    res.status(200).send("User is deleted");
};

module.exports = {
    addUser,
    checkId,
    oneUser,
    updateUser,
    deleteUser,
};
