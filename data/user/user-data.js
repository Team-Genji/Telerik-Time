const userExistsErrorCode = 11000;

const userExistsErrorMessage = 'User with this username already exists!';
const mongo = require('mongodb');
const User = require('./../../models/user-model');
const connection = mongo.MongoClient.connect('mongodb://localhost/LeagueOfNinjas');

module.exports = function (models) {
    let {
        User
    } = models;

    return {
        createUser(username, password, avatarUrl) {
            let user = new User({
                username,
                password,
                avatarUrl
            });
            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        if (err.code === userExistsErrorCode) {
                            return reject(userExistsErrorMessage);
                        }

                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        updateUserSettings(_id, settings) {
            return User.findById(_id, (err, user) => {
                if (settings.password) {
                    user.password = settings.password;
                }
                if (settings.avatarUrl) {
                    user.avatarUrl = settings.avatarUrl;
                }
                user.save();
            });
        }
    };
};