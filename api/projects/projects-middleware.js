// add middlewares here related to projects
function validateProject(req, res, next) {
    const { project } = req.body.id
    if (!project) {
        res.status(400).json({
            message: 'not a valid project'
        })
    } else {
        next()
    }
}

module.exports = {
    validateProject
}