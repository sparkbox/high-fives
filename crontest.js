const CronJob = require('cron').CronJob;

const job = new CronJob('0 */1 * * * *', function() {
	const d = new Date();
	console.log('Every Minute:', d);
});
job.start();
