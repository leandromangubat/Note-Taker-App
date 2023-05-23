const note = require('express').Router();
const fs = require('fs');
//Generates uuid for each note
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

// GET method
note.get('/api/notes', (req, res) => {
    const jsonFile = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    res.json(jsonFile);
});

note.post('/api/notes', (req, res) => {
    const jsonFile = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uuid(),
    }
    jsonFile.push(newNote);
    fs.writeFileSync("Develop/db/db.json", JSON.stringify(jsonFile));
    res.json(jsonFile);
});

note.delete('/api/notes/:id', (req, res) => {
    const savedNote = JSON.parse(fs.readFileSync("Develop/db/db.json", "utf8"));
    const delNote = savedNote.filter((note) => {
        return note.id !==req.params.id;
    });

    fs.writeFileSync("Develop/db/db.json", JSON.stringify(delNote));
    res.json("Note Deleted");
});

module.exports = note;