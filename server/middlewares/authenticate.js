const { findByToken } = require('../controllers/userController');

const authenticate = (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers['authorization']; // Express headers are auto converted to lowercase

    if (token) {
        findByToken(prepareToken(token))
            .then((user) => {
                if (user) {
                    request.decodedToken = token;
                    next();
                } else {
                    return response.json({
                        success: false,
                        message: 'Auth token is not correct'
                    });
                }
            })
    } else {
        return response.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

const prepareToken = (token) => {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        return token.slice(7, token.length);
    } else return token;
};

module.exports = {
    authenticate
};
