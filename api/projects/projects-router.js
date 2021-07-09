// Write your "projects" router here!
const express = require('express')

const router = express.Router()
const Projects = require('./projects-model')
const { validateProject } = require('./projects-middleware')

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

router.post('/projects',validateProject, async (req, res) => {
    const body = req.body
    if (!body.name && !body.description) {
        res.status(400).json({
            message: 'Name and description required'
        })
    } else {
        try {
            const project = await Projects.insert(body)
            res.status(201).json(project)
        }
        catch (err) {
            res.status(500).json({
                message: 'Invalid post'
            })
        }
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    if (!body.name || !body.description) {
        res.status(400).json({
            message: 'missing name or description'
        })
    } else {
        try {
            const project = await Projects.update(id, body);
            res.status(200).json(project)

        }
        catch (err) {
            res.status(500).json({
                message: 'Invalid post'
            });
        }
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const project = await Projects.remove(id)
        if (!project) {
            res.status(404).json({
                message: 'Specified ID does not exist'
            })
        } else {
            res.status(200).json(project)
        }
    }
    catch(err){
        res.status(500).json({
            message: 'Invalid request'
        });
    }
})
module.exports = router