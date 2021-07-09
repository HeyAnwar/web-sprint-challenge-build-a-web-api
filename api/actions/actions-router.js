// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.json(actions)
    }
    catch (err) {
        res.status(500).json({
            message: '[]'
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const action = await Actions.get(id)
        if (!action) {
            res.status(404).json({
                message:'Specified ID does not exist'
            })
        } else {
            res.status(200).json(action)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Invalid request'
        })
    }
})


module.exports = router