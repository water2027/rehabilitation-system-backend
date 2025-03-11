const User = require('../model/user/user')
class UserRepository {
	/**
	 * 
	 * @param {string} telephone 
	 * @returns 
	 */
	async findByTelephone(telephone) {
		return await User.findOne({ where: { telephone } });
	}

	/**
	 * 
	 * @param {string} id 
	 * @returns 
	 */
	async findById(id) {
		return await User.findByPk(id);
	}

    /**
     * @param {Object} info
     * @param {string} info.telephone 
     */
    async createUser(info) {
        return await User.create(info);
    }
}

module.exports = UserRepository;
