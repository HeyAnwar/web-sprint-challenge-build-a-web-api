// add middlewares here related to projects
async function validateProject(req, res, next) {
    try {
        const  project  = req.params.id
        if (!project) {
        res.status(400).json({
            message: 'not a valid project'
        })
    } else {
        next()
    }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateProject
}