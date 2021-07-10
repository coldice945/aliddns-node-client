const aliddns = require('./aliyun/aliddns');
const timer = require('./timer');
const logger = require('./utilities/logger');


aliddns.init();
timer.init();
logger.info('client is started');



