const mongoose = require('./Connection');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        selected: false,
    },
    passwordResetToken: {
        type: String,
        require: false,
    },
    passwordResetExpires: {
        type: Date,
        require: false,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    
    getUserByEmail: function (email, callback) {
        var query = { email };
        User.findOne(query, callback);
    },

    comparePassword: function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    },

    getUserById: function (id, callback) {
        User.findById(id, callback);
    }
}
