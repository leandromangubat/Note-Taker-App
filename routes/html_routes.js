const router = require('express').Router();
const path = require('path');

//Route for landing page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"))
});

//Route for application page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../Develop/public/notes.html'))
});

module.exports = router;