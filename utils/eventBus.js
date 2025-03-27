class EventBus {
	#listeners;
	constructor() {
		this.#listeners = new Map();
	}

	on(event, callback) {
		if (typeof event !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'event must be a string and callback must be a function'
			);
		}
		if (!this.#listeners.has(event)) {
			this.#listeners.set(event, new Set());
		}
		this.#listeners.get(event).add(callback);
	}

	off(event, callback) {
		if (typeof event !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'event must be a string and callback must be a function'
			);
		}
		if (!this.#listeners.has(event)) {
			return;
		}
		this.#listeners.get(event).delete(callback);
	}

	async emit(event, ...args) {
		if (!this.#listeners.has(event)) {
			return;
		}
		const promises = [];
		for (const callback of this.#listeners.get(event)) {
			promises.push(callback(...args));
		}
		await Promise.all(promises);
	}

	once(event, callback) {
		const onceCallback = (...args) => {
			callback(...args);
			this.off(event, onceCallback);
		};
		this.on(event, onceCallback);
	}

	clear() {
		this.#listeners.clear();
	}

	register(namespace, service) {
		if (!service || typeof service !== 'object') {
			throw new Error('Service must be an object');
		}
		console.log('register');

		// 为服务中的每个方法注册事件
		const prototype = Object.getPrototypeOf(service);
		Object.getOwnPropertyNames(prototype).forEach((methodName) => {
			// 跳过构造函数和内部方法
			if (methodName !== 'constructor' && !methodName.startsWith('_')) {
				const method = prototype[methodName];
				if (typeof method === 'function') {
					const eventName = `${namespace}:${methodName}`;
					this.on(eventName, method.bind(service));
				}
			}
		});
	}
}

module.exports = new EventBus();
