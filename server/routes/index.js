/**
 * Created by lukedowell on 8/24/15.
 */
var router = require('express').Router();
var path = require('path');

router.get('/*', function(req, res) {
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;