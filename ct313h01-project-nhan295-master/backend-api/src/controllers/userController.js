const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
}

// Sign up
const signup = async (req, res) => {

    try {
        const { username, address, password, confirmPassword, email, date } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existUsername = await userModel.getUsername(username);
        const existEmail = await userModel.getEmail(email);

        if (existUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        if (existEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.signup(username, address, hashedPassword, email, date);
        
        req.session.user = await userModel.getUserData(username)
        req.session.user_name = username
        res.status(200).json({ message: req.session.user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up' });
    }
}

// Sign in
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const getUsername = await userModel.getUsername(username)

        if (!getUsername) {
            return res.status(401).json({ message: 'Username is not exists' });
        }

        const getPassword = await userModel.getPassword(username)
        const match = await bcrypt.compareSync(password, getPassword)

        if (!match) {
            return res.status(401).json({ message: 'Wrong password' });
        } else {
            req.session.user = await userModel.getUserData(username)
            req.session.user_name = username
            res.status(200).json({ message: req.session.user });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing in' });
    }
}

// Logout
const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out' });
    });
}

// User data
const userData = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    res.status(200).json({ user: req.session.user });
}

// Change password
const changePassword = async (req, res) => {
    const userId = req.session.user.user_id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword ||!newPassword ||!confirmPassword) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (newPassword!== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const oldPassword = await userModel.passwordByUserId(userId); // Get old password by user id

    const match = bcrypt.compareSync(currentPassword, oldPassword) // Compare password

    if(match) {
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10); // Hash password
        await userModel.changePassword(userId, hashedNewPassword); // Change password
        
        res.status(200).json({ message: 'Password changed successfully' });
    } else {
        return res.status(401).json({ message: 'Wrong current password' });
    }
}



module.exports = {
    getAllUsers,
    signup,
    signin,
    userData,
    logout,
    changePassword
  
}