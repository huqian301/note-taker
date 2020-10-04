const fs = require ("fs");
const path = require ("path");
const util = require ("util");
const {v1: uuidv1 } = require ("uuid");
const readFileAsync =util.promisify(fs.readFile);
const writeFileAsync = util.promisify (fs.writeFile);
const dbPath = path.join (__dirname, "../db/db.json" )

class Controller {

    read () {
        return readFileAsync (dbPath, "utf8");
    }
    write (content) {
        return writeFileAsync (dbPath, content);
    }
    getNotes () {
        return this.read().then((data) => {
            return data
            ? JSON.parse (data)
            : [];
          
        });
    }

    saveNotes (notes){
        return this.write (JSON.stringify(notes));
    }

    addNote(note) {
        return this
                .getNotes()
                .then( (notes) => {
                    const newNote = {...note, id: uuidv1()};
                    notes.push (newNote);
                   
                 return this.saveNotes (notes).then (()=> newNote);
                   
                });
    }
    deleteNote(noteId){
        return this
            .getNotes ()
            .then ((notes)=> {

                const newList = notes.filter ((note) => note.id !==noteId);
                this.saveNotes (newList);

  
            });
    }
}
module.exports =new Controller;