const jwt = require('../models/jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.headers.token;
        // 토큰 없음
        if (!token)
            return res.msg("로그인하지 않으셧습니다");
        // decode
        const user = await jwt.verify(token);
        // 유효기간 만료
        if (user === TOKEN_EXPIRED)
            return res.res.msg("로그인유효 시간이 지났습니다");
        // 유효하지 않는 토큰
        if (user === TOKEN_INVALID)
            return res.res.msg("유효하지 않은 접근입니다");
        if (user.idx === undefined)
            return res.res.msg("유효하지 않은 접근입니다");
        req.idx = user.idx;
        next();
    }
}

module.exports = authUtil;