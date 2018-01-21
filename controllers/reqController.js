function reqHandler(err, req, res, data) {
    // res.status(500);
    console.log("errorhendler", err, req, res, data)
    // res.send('error', err)
}
module.exports = reqHandler;
