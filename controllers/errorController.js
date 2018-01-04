function errorHandler (err, req, res, next) {
    res.status(500);
    console.log("errorhendler", err)
    res.send('error', err )
}
module.exports = errorHandler;