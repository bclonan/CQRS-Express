const logger = require('../utils/logger');

function trackDataChanges() {
    return async function (req, res, next) {
        const originalSend = res.send;
        res.send = function (data) {
            // Log the response data
            logger.info('Data Sent:', { data });
            return originalSend.apply(res, arguments);
        };
        next();
    };
}

module.exports = { trackDataChanges };
