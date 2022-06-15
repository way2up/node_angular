const User = require('../models/User');
const Skills = require('../models/Skill');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const userData = require('./json/userData.json');
const skillData = require('./json/skillData.json');

(async () => {
    mongoose.connect(
        keys.mongoLocal, {
            useNewUrlParser: true,
            useFindAndModify: false
        }
    )

    const users = await User.find();
    const skills = await Skills.find();

    if (!users.length) {
        const hashPassword = bcrypt.hashSync('qwerty654321', 10);
        const user = new User({
            ...userData,
            password: hashPassword,
        })
        await user.save();
    }

    if (!skills.length) {
        await Skills.create(skillData);
    }

    console.log('success');
    exit();
})()

function exit() {
    mongoose.disconnect();
}