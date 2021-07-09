// Write your "projects" router here!
const express = require('express')

const router = express.Router()
const Projects = require('./projects-model')
// const { validateProject } = require('./projects-middleware')

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.json(projects)
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
        const project = await Projects.get(id)
        if(!project) {
            res.status(404).json({
                message: 'Specified project does not exist'
            })
        } else {
            res.json(project)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Could not retrieve specified project'
        })
    }
})


module.exports = router