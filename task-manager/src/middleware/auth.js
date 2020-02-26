const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    try {
        const token = request.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        request.user = user;
        next();
    } catch (error) {
        return response.status(401).send({ error: 'Please authenticate'});
    }
};

module.exports = auth;
