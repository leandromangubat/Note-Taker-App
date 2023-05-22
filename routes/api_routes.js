const router = require('express').Router();
const fs = require('fs');
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

router.get('/api/notes', async (req, res) => {
    const jsonFile = await JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    res.json(jsonFile);
});

router.post('/api/notes', (req, res) => {
    const jsonFile = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    }
    jsonFile.push(newNote);
    fs.writeFileSync("Develop/db/db.json", JSON.stringify(jsonFile));
    res.json(jsonFile);
});

module.exports = router;