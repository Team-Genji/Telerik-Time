module.exports = function(app, data) {
    let authController = require('../controllers/user/auth-controller')(data);
    let usersController = require('../controllers/user/users-controller')(data);
    let leagueinfocontroller = require('../controllers/league/league-info-controller')(data);

    app
        .get('/signin', usersController.getLogin)
        .post('/signin', authController.loginLocal)
        .get('/signup', usersController.getRegister)
        .post('/signup', authController.register)
        .get('/sign-out', authController.logout)
        .get('/profile', usersController.getProfile)
        .post('/profile/', authController.isAuthenticated, usersController.updateUser)
        .get('/summonerinfo', leagueinfocontroller.getSummonerInfo)
        .post('/summonerinfo', leagueinfocontroller.getSummonerInfoPage)
        .get('/gameinfo', leagueinfocontroller.getGameInfo)
        .get('/unauthorized', usersController.getUnauthorized);
};