const Errorhandle = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "somthing wait wrong"

    res.status(status).json({
        success: false,
        message
    })
}

module.exports = Errorhandle