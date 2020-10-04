const router  = require("express").Router();
const controller = require ("../controller/controller");

router.get("/notes", (_req, res) => {
  controller.getNotes ().then ((notes) => {
    res.json(notes);
  })
  .catch((err)=>{res.status(500).json(err)
  });
});

router.post("/notes", (req, res)=> {

  controller.addNote (req.body).then ((note) => {
    res.json(note);
  })
  .catch((err)=>{res.status(500).json(err)
  });
})

router.delete ("/notes/:id", (req,res)=> {
  controller.deleteNote(req.params.id).then(()=>res.json({ok:true}))  
  .catch((err)=>{res.status(500).json(err)
  });
})



module.exports = router;