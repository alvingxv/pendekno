const User = require('../models/user');
const Url = require('../models/url');

const checkurlcontainspecialchar = (string) => {
    if (string.indexOf('%') >= 0 || string.indexOf('?') >= 0 || string.indexOf('+') >= 0 || string.indexOf('(') >= 0 || string.indexOf(')') >= 0) {
        return true;
    }
    return false;
}


exports.home = async (req, res, next) => {
    res.render('index');
}


exports.shrink = async (req, res, next) => {
    const shorturl = req.body.shorturl;
    const fullurl = req.body.fullurl;
    const ada = await Url.findOne({ shorturl })
    const randomurl = Math.random().toString(36).substring(2, 8) 
    if (ada) {
        req.flash('info', 'Short URL wes digawe');
        res.redirect(`/`);
        return;
    }

    if (!shorturl) {
        await Url.create({ fullurl: fullurl, shorturl: randomurl });
        res.redirect(`/${randomurl}/dashboard`);
        return;
    }
    if (shorturl.indexOf(' ') >= 0) {
        req.flash('info', 'Short URL cannot contain space');
        res.redirect('/');
        return;
    }

    if (checkurlcontainspecialchar(shorturl) == true) {
        req.flash('info', 'Short URL cannot use special character');
        res.redirect('/');
        return;
    }
    await Url.create({ fullurl: fullurl, shorturl: shorturl });
    res.redirect(`/${shorturl}/dashboard`);
}

exports.notfound = async (req, res, next) => {
    return res.render('notfound');
}
exports.dashboard = async (req, res, next) => {
    const halo = await Url.findOne({ shorturl: req.params.shorturl })
    console.log(halo);
    res.render('dashboard', {halo: halo});
    return;
}
exports.redirect = async (req, res, next) => {
    const halo = await Url.findOne({ shorturl: req.params.shorturl })
    if (halo) {
        halo.clicks++;
        halo.save();
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