const note = require('express').Router();
const {readFileSync, writeFileSync} = require('fs');
//Generates uuid for each note
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

// GET method
note.get('/api/notes', (req, res) => {
    const jsonNote = JSON.parse(readFileSync("Develop/db/db.json", "utf8"));
    res.json(jsonNote);
});

//POST method
note.post('/api/notes', (req, res) => {
    const jsonNote = JSON.parse(readFileSync("Develop/db/db.json", "utf8"));
    const {title, text} = req.body;
    const newNote = {
        title,
        text,
        id: uuid(),
    }
    jsonNote.push(newNote);
    writeFileSync("Develop/db/db.json", JSON.stringify(jsonNote));
    res.json(jsonNote);
});

//DELETE method
note.delete('/api/notes/:id', (req, res) => {
    const jsonNote = JSON.parse(readFileSync("Develop/db/db.json", "utf8"));
    //Filters note to be deleted
    const delNote = jsonNote.filter((note) => {
        return note.id !==req.params.id;
    });
    //Creates updated file with deleted note
    writeFileSync("Develop/db/db.json", JSON.stringify(delNote));
    res.json("Note Deleted");
});

module.exports = note;