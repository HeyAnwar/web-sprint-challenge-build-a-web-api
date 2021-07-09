// Write your "actions" router here!
const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        console.log('hmm')
    }
    catch (err) {
        res.status(500).json({
            message: 'failed'
        })
    }
})

module.exports = router