const { SuccessResponse } = require('../dto');
const AuthService = require('../service/auth');

class AuthController {
    async getAllUnauthDoctor(req, res, next) {
        try{
            const { pageNumber, pageSize } = req.body;
            if(pageSize < 1 || pageNumber < 1){
                throw new Error('Invalid page number or page size')
            }
            const result = await AuthService.getAllUnauthDoctor({ pageNumber, pageSize })
            return SuccessResponse(res, result)
        }catch(err){
            next(err)
        }
    }

    async getAllAuthDoctor(req, res, next) {
        try{
            const { pageNumber, pageSize } = req.body;
            if(pageSize < 1 || pageNumber < 1){
                throw new Error('Invalid page number or page size')
            }
            const result = await AuthService.getAllAuthDoctor({ pageNumber, pageSize })
            return SuccessResponse(res, result)
        }catch(err){
            next(err)
        }
    }

    async getAllDoctor(req, res, next) {
        try{
            const { pageNumber, pageSize } = req.body;
            if(pageSize < 1 || pageNumber < 1){
                throw new Error('Invalid page number or page size')
            }
            const result = await AuthService.getAllDoctor({ pageNumber, pageSize })
            return SuccessResponse(res, result)
        }catch(err){
            next(err)
        }
    }

    async authDoctor(req, res, next) {
        try{
            const { id } = req.body;
            if(!id){
                throw new Error('Invalid id')
            }
            await AuthService.authDoctor({ id })
            return SuccessResponse(res)
        }catch(err){
            next(err)
        }
    }
}

module.exports = new AuthController();
