// lsjdjwjsnsnsnsn
__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/docs', (req, res) => {
    res.sendFile(__path + '/public/index.html')
})
router.get('/', (req, res) => {
    res.sendFile(__path + '/public/index.html')
})

module.exports = router
