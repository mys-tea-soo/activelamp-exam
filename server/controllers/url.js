const UrlModel = require('../models/url');
const Helpers = require('../helpers');

exports.create = async (req, res, next) => {
    try {
        // const result = await UrlModel.create(req.body);
        UrlModel.get(req.body.url).then(r => {
            console.log(r)

            res.send(JSON.stringify(r))
            // return res.send(Helpers.response('success', 'Successfully generate and shorten URL.', r));
        })
        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return res.send(Helpers.response('error', err && err.message ? err.message : 'Something went wrong, please try again.'));
    }
}
  