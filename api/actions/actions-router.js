// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateIdAction, validateAction } = require('./actions-middlware');

router.get('/api/actions', (req, res, next) => {
    Actions.get()
    .then( action => {
        if(!action){
            res.status(200).json([])
        } else{
            res.status(200).json(action)
        }
    })
    .catch(next)
})
router.get('/api/actions/:id', validateIdAction, (req, res) => {
    res.json(req.action);
})
router.post('/api/actions', validateAction, (req, res, next) => {
    Actions.insert({notes: req.notes, description: req.description})
    .then(newUser => {
        res.status(201).json(newUser);
  })
    .catch(next);
})
router.put('/api/actions/:id', validateIdAction, validateAction, (req, res, next) => {
    Actions.update(req.params.id, {notes: req.notes, description: req.description})
    .then(() => {
        return Actions.get(req.params.id)
  })
    .then(act => {
        res.json(act);
  })
    .catch(next)

})
router.delete('/api/actions/:id', validateIdAction, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id)
        res.json(req.action);
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
