const schedule = require('node-schedule');
const dayjs = require("dayjs");
const config = require('../../config');
const aliddns = require('../aliyun/aliddns');
const ip = require('../utilities/ip');
let count = 1;

let Ali_DOMAINS = [];

async function checkChange() {
    console.log(`============== 第 ${count++} 次检测开始 ${dayjs().format('YYYY-MM-DD HH:mm:ss')} ==============`);

    let realIp = ip.getRealIp();

    Ali_DOMAINS.forEach(async domain => {
        let record = await aliddns.getDomainRecord(domain);
        if (!record) {
            return;
        }
        let serverIp = record && record.Value;
        if (!serverIp) {
            await addDomain(realIp, domain);
            return;
        }
        let ipChanged = realIp && realIp !== serverIp;
        let {RR, DomainName} = parseDomain(domain);
        let domainChanged = `${RR}.${DomainName}` !== `${record.RR}.${record.DomainName}`;
        let changed = ipChanged || domainChanged;
        changed && await updateDomain(realIp, domain);
    });
}


async function addDomain(ip, domain) {
    await aliddns.addDomain(ip, domain);
}


async function updateDomain(ip, domain) {
    await aliddns.updateDomain(ip, domain);
}


function start(rule, callback) {
    return schedule.scheduleJob(rule, () => callback());
}


function init() {
    if (Array.isArray(config.domain)) {
        Ali_DOMAINS = config.domain;
    } else {
        Ali_DOMAINS = Array.of(config.domain);
    }
    start(config.cronRule, () => checkChange(config));
}

function parseDomain(domain) {
    let results = domain.split('.');
    if (results.length < 3) {
        return {RR: '@', DomainName: domain};
    }
    let RR = results.splice(0, results.length - 2).join('.');
    let DomainName = results.join('.');
    return {RR, DomainName}
}

module.exports = {
    init
};
