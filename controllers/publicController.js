const User = require('../models/user');
const Url = require('../models/url');


exports.home = async (req, res, next) => {
    res.render('index');
}


exports.shrink = async (req, res, next) => {
    const halo = await Url.findOne({ shorturl: req.body.shorturl })

    if (halo) {
        req.flash('info', 'Short URL wes digawe');
        res.redirect('/');
        return;
    }

    await Url.create({ fullurl: req.body.fullurl, shorturl: req.body.shorturl });
    res.redirect('/');
}

exports.notfound = async (req, res, next) => {
    return res.render('notfound');
}
exports.test = async (req, res, next) => {
    return res.send('test');
}
exports.redirect = async (req, res, next) => {
    const halo = await Url.findOne({ shorturl: req.params.shorturl })
    if (halo) {
        res.redirect(halo.fullurl);
        return;
    }
    return res.redirect('/notfound');
}


// publicrouter.get('/test', async (req, res) => {
//     try {
//         const user = await User.find();
//         return res.status(200).json(user);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// })


// publicrouter.post('/test', async (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     try {
//         const newUser = await user.save();
//         return res.status(201).json(newUser);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// })