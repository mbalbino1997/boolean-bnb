function errorsMiddleware(err, _, res, next) {
    console.log(res);
    res.status(500).json({
        message: err.message,
    })

}

module.exports = errorsMiddleware