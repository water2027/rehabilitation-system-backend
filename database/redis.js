const Redis = require('ioredis');

class RedisPool {
	/**
	 * 
	 * @param {Object} options 
	 * @param {number} options.size
	 * @param {string} options.host
	 * @param {number} options.port
	 * @param {number} options.db
	 * @param {number} options.connectTimeout
	 * @param {number} options.maxRetriesPerRequest
	 * 
	 */
	constructor(options = {}) {
		const poolSize = options.size || 10;
		this.connections = [];
		this.options = options;
		this.poolSize = poolSize;
		this.currentIndex = 0;
		this.init();
		this.setupCleanup();
	}

	init() {
		for (let i = 0; i < this.poolSize; i++) {
			const redis = new Redis({
				host: this.options.host || 'localhost',
				port: this.options.port || 6379,
				password: this.options.password || '',
				db: this.options.db || 0,
				connectTimeout: this.options.connectTimeout || 10000,
				maxRetriesPerRequest: this.options.maxRetriesPerRequest || 3,
				connectionName: `pool-${i}`,
			});

			redis.on('error', (err) => {
				console.error(`${redis} error: `, err);
			});

			this.connections.push(redis);
		}
		console.log('redis pool init ', this.poolSize);
	}

	setupCleanup() {
		['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) => {
			process.on(signal, async () => {
				console.log(`收到 ${signal} 信号，正在关闭 Redis 连接池...`);
				await this.closeAll();
				console.log('Redis 连接池已安全关闭');
				process.exit(0);
			});
		});

		process.on('uncaughtException', async (err) => {
			console.error('未捕获的异常:', err);
			await this.closeAll();
			process.exit(1);
		});
	}

	async closeAll() {
		console.log('关闭所有 Redis 连接');
		await Promise.all(this.connections.map((redis) => redis.quit()));
		console.log('Redis 连接已关闭');
	}

	getConnection() {
		const connection = this.connections[this.currentIndex];
		this.currentIndex = (this.currentIndex + 1) % this.poolSize;
		return connection;
	}
}

module.exports = new RedisPool({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PASSWORD,
	poolSize: process.env.REDIS_SIZE,
});
