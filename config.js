module.exports = {
  accessKeyId: process.env.ACCESSKEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  domain: JSON.parse(process.env.DOMAIN),
  cronRule: process.env.CRON_RULE
}
