// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    // DO YOUR MAGIC
    try {
      const project = await Projects.get(req.param.id);
      if(!project){
        res.status(404).json({
          message: "not found"
        })
      } else{
        req.project = project;
      }
    }
    catch (err){
      res.status(500).json({
        message: "500 error"
      })
    }
}

function validateProject(req, res, next) {
  // DO YOUR MAGIC
  const { name, description } = req.body;
  if(!name || !description){
    res.status(400).json({
      message: "user not found"
    })
  } else{
    req.name = name.trim();
    req.description = description.trim();
    next()
  }
}

  module.exports = { validateProjectId, validateProject }
