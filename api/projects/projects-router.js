// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

router.get('/api/projects', (req,res,next) => {
    Projects.get()
    .then( project => {
        if(!project){
            res.status(200).json([])
        } else{
            res.status(200).json(project)
        }
    })
    .catch(next)
})
router.get('/api/projects/:id', validateProjectId, (req,res) => {
    res.json(req.project);
})
router.post('/api/projects', validateProject, (req,res,next) => {
    Projects.insert({name: req.name, description: req.description})
    .then(pro => {
        res.status(201).json(pro);
  })
    .catch(next);
})
router.put('/api/projects/:id', validateProjectId, validateProject, (req,res,next) => {
    Projects.update(req.params.id, {name: req.name, description: req.description})
    .then(() => {
        return Projects.get(req.params.id)
  })
    .then(pro => {
        res.json(pro);
  })
    .catch(next)
})
router.delete('/api/projects/:id', validateProjectId, async (req,res,next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(req.project);
    }
    catch (err){
        next(err)
    }
})
router.get('/api/projects/:id/actions', validateProjectId, async (req,res,next) => {
    try{
        const result = await Projects.get(req.params.id);
        res.json(result);
    }
    catch (err){
        next(err)
    }
})

router.use((err, req, res,next) => {
    res.status(err.status || 500).json({
      message: "Something went wrong",
      err: err.message,
      stack: err.stack
    })
})

module.exports = router;
