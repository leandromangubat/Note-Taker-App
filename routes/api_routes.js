const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

router.get('/api/notes', async (req, res) => {
    const jsonFile = await JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    res.json(jsonFile);
});

router.post('/api/notes', (req, res) => {
    const jsonFile = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }
    jsonFile.push(newNote);
    fs.writeFileSync("Develop/db/db.json", JSON.stringify(jsonFile));
    res.json(jsonFile);
});

module.exports = router;