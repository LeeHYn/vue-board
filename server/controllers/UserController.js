const db = require("../models");
const {Op} = require("sequelize");
const User = db.users;
const jwt = require("jsonwebtoken")

//nameCheck
const checkId = async (req, res) => {
    try {
        let userId = req.body.id;
        const user = await User.findOne({
            where: {
                [Op.or]: [{userId: userId}],
            },
        });
        console.log(res.json)
        if (user === null) {
            return res.send({code: 200})
        } else {
            return res.send({code: 404});
        }
    } catch (err) {
        console.log(err)
    }

}

//create
const addUser = async (req, res) => {
    let info = {
        name: req.body.name,
        userId: req.body.id,
        password: req.body.password,
    };
   await User.create(info).then(res.send({code: 200})).catch((err) => {
        res.send({code: 401})
        console.log(err)
    });
};

//LogIn
const oneUser = async (req, res) => {
    let userId = req.body.userId;
    let password = req.body.password;
    try {
        const user = await User.findOne({where: {userId: userId, password: password}})
        const accessToken = jwt.sign(
            {
                userId: User.userId,
            },              // 유저 정보
            "${process.env.JWT_KEY}",  // 일종의 salt
            {expiresIn: 60 * 60 * 1000}      // 옵션 중에서 만료기간
        )
        const refreshToken = jwt.sign(
            {
                userId: User.userId,
            },
            "${process.env.JWT_KEY}",
            {expiresIn: '1d'}
        )

        if (user) {
            user.refresh = refreshToken
            await user.save();
            return res.send({
                code: 200,
                accessToken: accessToken,
                refresh_token:refreshToken,
                userId:req.body.userId
            })
        } else {
            console.log("User not found");
        }


    } catch (e) {
        return console.log(e)
    }


};
//LogOut
const logOut = async (req, res) => {
    const secretKey = "${process.env.JWT_KEY}"
    req.decoded = jwt.verify(req.cookies, secretKey);
    console.log(req.decoded)
    const userId = await req.decoded
    const user = await User.findOne({where: {userId: userId}})
    if (user) {
        user.refersh = null;
        await user.save();
    } else {
        console.log("User not found");
    }
    return res.send({
        code: 200,
    }).cookie.clear('user')
};
//tokencheck
const check = (req, res) => {
    // 인증 확인
    const token = req.header('accessToken')
    console.log("token : " + req.header('accessToken'))
    let jwt_secret = "${process.env.JWT_KEY}";

    if (!token) {
        return res.status(400).json({
            'status': 400,
            'msg': 'Token 없음'
        });
    }
    const checkToken = new Promise((resolve, reject) => {
        jwt.verify(token, jwt_secret, function (err, decoded) {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    checkToken.then(
        token => {
            console.log(token);
            return res.status(200).json({
                'status': 200,
                'msg': 'success',
                token
            });
        }
    )
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
    logOut,
    check
};
