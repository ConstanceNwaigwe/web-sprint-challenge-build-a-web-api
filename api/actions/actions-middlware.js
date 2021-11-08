// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateIdAction(req, res, next) {
    // DO YOUR MAGIC
    try {
      const action = await Actions.get(req.param.id);
      if(!action){
        res.status(404).json({
          message: "not found"
        })
      } else{
        req.action = action;
        next();
      }
    }
    catch (err){
      res.status(500).json({
        message: "500 error"
      })
    }
}

function validateAction(req, res, next) {
  // DO YOUR MAGIC
  const { description, notes } = req.body;
  if(!notes || !description){
    res.status(400).json({
      message: "user not found"
    })
  } else{
    req.notes = notes.trim();
    req.description = description.trim();
    next()
  }
}

  module.exports = { validateIdAction, validateAction }
