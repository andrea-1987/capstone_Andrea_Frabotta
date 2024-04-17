const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                message: 'Token not provided',
                statusCode: 401
            });
        }
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token',
                    statusCode: 403
                });
            }
            req.user = decoded;

               next();
        });
    } catch (error) {
        next(error);
    }
};
