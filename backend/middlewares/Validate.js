const valide = (schema) => async(req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body)
        next()
    } catch (err) {
        const message = err.errors[0].message

        console.log(message)
        res.json({
            success: false,
            message: message
        })
    }
}


module.exports = valide