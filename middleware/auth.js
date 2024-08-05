const { verifyToken } = require("../utils/handleJWT");
const { usersModel } = require("../models");


const checkAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(409).json({ success: false, error });
            return;
        }
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);
        if (tokenData.id) {
            const user = await usersModel.findOne({
                where: {
                    id: tokenData.id,
                }
            })
            req.usuario = user
            next();
        } else {
            res.status(409).json({ success: false, error });
        }
    } catch (e) {
        
        res.status(403).json({ success: false, e });
    }
};

module.exports = checkAuth;