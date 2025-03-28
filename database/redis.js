/* eslint-disable n/no-process-exit */
const Redis = require('ioredis').default;

class RedisPool {
	/**
	 * @type {Redis[]}
	 */
	connections;
	/**
	 *
	 * @param {Object} options
	 * @param {number} options.size
	 * @param {string} options.host
	 * @param {number} options.port
	 * @param {string} options.password
	 * @param {number} [options.db]
	 * @param {number} [options.connectTimeout]
	 * @param {number} [options.maxRetriesPerRequest]
	 *
	 */
	constructor(options) {
		const poolSize = options.size || 10;
		this.connections = [];
		this.options = options;
		this.poolSize = poolSize;
		this.currentIndex = 0;
		this.#init();
		this.#setupCleanup();
	}

	#init() {
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

	#setupCleanup() {
		['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((signal) => {
			process.on(signal, async () => {
				console.log(`收到 ${signal} 信号，正在关闭 Redis 连接池...`);
				await this.#closeAll();
				console.log('Redis 连接池已安全关闭');
				process.exit(0);
			});
		});

		process.on('uncaughtException', async (err) => {
			console.error('未捕获的异常:', err);
			await this.#closeAll();
			process.exit(1);
		});
	}

	async #closeAll() {
		console.log('关闭所有 Redis 连接');
		await Promise.all(this.connections.map((redis) => redis.quit()));
		console.log('Redis 连接已关闭');
	}

	/**
	 * 这里文档注释貌似有问题，就算加了注释也没有set和get的代码提示，但实际没有问题
	 *
	 * @returns {Redis} A Redis client instance from the connection pool
	 * @example
	 * // 获取一个连接
	 * const redis = redisPool.getConnection();
	 *
	 * // 存储键值对
	 * await redis.set('key', 'value');
	 * // 获取键值对
	 * const value = await redis.get('key');
	 */
	#getConnection() {
		const connection = this.connections[this.currentIndex];
		this.currentIndex = (this.currentIndex + 1) % this.poolSize;
		return connection;
	}

	/**
	 * 设置键值对，支持过期时间
	 * @param {string} k - 键
	 * @param {any} v - 值
	 * @param {number} [expire] - 过期时间（秒）
	 * @returns {Promise<string>} - 操作结果，成功是 OK
	 */
	set(k, v, expire = undefined) {
		let key = k;
		let value = v;
		if (value instanceof Object) {
			value = JSON.stringify(value);
		}
		const connection = this.#getConnection();
		if (expire !== undefined && expire !== null) {
			return connection.set(key, value, 'EX', expire);
		}
		return connection.set(key, value);
	}

	/**
	 *
	 * @param {string} key - 键
	 * @returns  - 对应的值，如果是对象会自动解析
	 */
	async get(key) {
		const connection = this.#getConnection();
		const value = await connection.get(key);
		if (value === null) {
			return null;
		}
		try {
			return JSON.parse(value);
		// eslint-disable-next-line no-unused-vars
		} catch (e) {
			return value;
		}
	}

	/**
	 * 删除键
	 * @param {string} key - 键
	 * @returns - 删除的键数量
	 */
	del(key) {
		const connection = this.#getConnection();
		return connection.del(key);
	}

	/**
	 * 检查键是否存在
	 * @param {string} key - 键
	 * @returns - 存在的键数量
	 */
	async exists(key) {
		const connection = this.#getConnection();
		const count = await connection.exists(key);
		return count > 0;
	}
}

module.exports = new RedisPool({
	host: process.env.REDIS_HOST,
	port: parseInt(process.env.REDIS_PORT),
	password: process.env.REDIS_PASSWORD,
	size: parseInt(process.env.REDIS_SIZE),
});
