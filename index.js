const express = require("express");
const router = express.Router();

const logger = require("./routes/error");



// Universal Error Handler
router.use((err, req, res, next) => {
    // Show the errors in development console
    if (process.env.NODE_ENV !== 'production') { console.log(err); }
    // Log the errors to a file, cleared on each server restart
    logger.error(`${new Date().toISOString()} | ${req.method} - ${req.originalUrl} | IP: ${req.ip} | Error: ${err.message} | Body: ${JSON.stringify(req.body)} | Headers: ${JSON.stringify(req.headers)}`);
    // Send a response
    res.json({
        success: false,
        msg: "Something went wrong, please try again later."
    })
})