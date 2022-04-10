const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/user/login`,
            `${api}/user/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {

    done();
}



module.exports = authJwt