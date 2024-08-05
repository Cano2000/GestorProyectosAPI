const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_SECRET
    );
};

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
};

const decodeSign = (token) => {
    return jwt.decode(token, null);
};

module.exports = { tokenSign, decodeSign, verifyToken };