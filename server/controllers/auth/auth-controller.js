const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
require('dotenv').config;
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkuser = await User.findOne({ email });
        if (checkuser) {
            return res.json({ success: false, message: 'User already exists', });
        }
        const hashpassword = await bcrypt.hash(password, 12);
        const newuser = new User({
            userName,
            email,
            password: hashpassword,
        });
        await newuser.save();
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured',
        });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkuser = await User.findOne({ email });
        if (!checkuser) {
            return res.json({ success: false, message: "Account doesn't exist", });
        }
        const isMatch = await bcrypt.compare(password, checkuser.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Wrong Password' });
        }
        const token = jwt.sign({ id: checkuser._id, role: checkuser.role, email: checkuser.email, userName: checkuser.userName }, process.env.JWT_SECRET, { expiresIn: '60m' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        }).json({
            success: true,
            message: 'welcome',
            user: {
                email: checkuser.email,
                role: checkuser.role,
                id: checkuser._id,
                userName: checkuser.userName,
            },
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured',
        });
    }
}
const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged Out",
    });
};
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorised user!",
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "unauthorised user!",
        })
    }
}
module.exports = { registerUser, loginUser, logoutUser, authMiddleware }