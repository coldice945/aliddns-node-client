const process = require('./process');
const logger = require('./logger');
const error = require('../error');
const API_Domain = 'https://www.taobao.com/help/getip.php';


function getRealIp() {
    const result = (process.curl(API_Domain) || '').match(/\"(.*?)\"/ig);
    const ip = (result || []).map(str => str.substr(1, str.length - 2))[0]

    if (ip) {
        logger.info(`get real ip success ${ip}`);
    } else {
        logger.error(error.IP_EMPTY_ERROR);
    }
    return ip;
}

module.exports = {
    getRealIp
};