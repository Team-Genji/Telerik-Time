const userNotLoggedInMessage = 'User not logged in!';

module.exports = function(data) {
    return {
        listForums(req, res) {
            return data.getForums()
                .then(forums => {
                    res.render('./forums/forum-main', {
                        forums,
                        user: req.user
                    });
                })
                .catch(err => {
                    res
                        .status(400)
                        .send(err);
                });
        },
        createForum(req, res) {
            if (!req.user) {
                return res.render('errorpage', {
                    error: {
                        message: userNotLoggedInMessage
                    }
                });
            }

            let {
                name
            } = req.body;

            return data.createForum(name)
                .then(() => {
                    return res.redirect('/forums');
                })
                .catch(err => {
                    res
                        .status(400)
                        .send(err);
                });
        },
        getForumById(req, res) {
            let id = req.params.id;

            return data.getForumById(id)
                .then(forum => {
                    return res.render('./forums/topic-list', {
                        forum,
                        user: req.user
                    });
                });
        }
    };
};