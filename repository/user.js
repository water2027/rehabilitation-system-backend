const User = require('../model/user/user')
class UserRepository {
	async findAll() {
		return await User.findAll();
	}

	async findById(id) {
		return await User.findByPk(id);
	}

	async findByTelephone(telephone) {
		return await User.findOne({ where: { telephone } });
	}

    /**
     * 
     * @param {string} telephone 
     */
    async createUser(telephone) {
        return await User.create(telephone);
    }

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @returns 
     */
    async setName(id, name) {
        const user = await User.findByPk(id);
        user.name = name;
        return await user.save();
    }
}

module.exports = new UserRepository();
