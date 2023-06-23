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
    const secretKey = "${process.env.JWT_KEY}";
    req.decoded = jwt.verify(req.cookies, secretKey);
    console.log(req.decoded);
    const userId = await req.decoded;
    const user = await User.findOne({ where: { userId: userId } });
    if (user) {
        user.refersh = null;
        await user.save();
    } else {
        console.log("User not found");
    }

    // 쿠키 삭제
    res.clearCookie('accessToken');
    res.clearCookie('refresh_token');
    return res.status(200).send({
        code: 200,
    });
}
//tokencheck
const check = async (req, res) => {
    // 토큰 확인
    const accessToken = req.header('accessToken');
    const refreshToken = req.header('refresh_token');
    const jwt_secret = "${process.env.JWT_KEY}";

    if (!accessToken) {
        return res.status(400).json({
            'status': 400,
            'msg': 'Access Token이 없습니다.'
        });
    }

    try {
        // Access Token 검증
        jwt.verify(accessToken, jwt_secret, (err, decoded) => {
            if (err) {
                // Access Token이 만료되었을 경우 Refresh Token으로 갱신 시도
                if (err.name === 'TokenExpiredError' && refreshToken) {
                    jwt.verify(refreshToken, jwt_secret, async (err, decoded) => {
                        if (err) {
                            return res.status(401).json({
                                'status': 401,
                                'msg': 'Refresh Token이 유효하지 않습니다.'
                            });
                        }

                        // DB에서 해당 유저의 Refresh Token 확인
                        const user = await User.findOne({ where: { refresh: refreshToken } });
                        if (!user) {
                            return res.status(401).json({
                                'status': 401,
                                'msg': 'Refresh Token이 유효하지 않습니다.'
                            });
                        }

                        // Access Token 재발급
                        const newAccessToken = jwt.sign(
                            {
                                userId: user.userId
                            },
                            jwt_secret,
                            { expiresIn: 60 * 60 * 1000 }
                        );

                        return res.status(200).json({
                            'status': 200,
                            'msg': 'Access Token이 갱신되었습니다.',
                            'accessToken': newAccessToken
                        });
                    });
                } else {
                    return res.status(401).json({
                        'status': 401,
                        'msg': 'Access Token이 유효하지 않습니다.'
                    });
                }
            } else {
                // Access Token이 유효한 경우
                return res.status(200).json({
                    'status': 200,
                    'msg': 'Access Token이 유효합니다.',
                    'decoded': decoded
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            'status': 500,
            'msg': '서버 오류'
        });
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
    logOut,
    check
};
