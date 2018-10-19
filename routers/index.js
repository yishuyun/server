const Joi = require('joi')
const gogsApis = require('../gogs')

module.exports = [
  {
    method: 'POST',
    path: '/login',
    options: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    },
    handler: async (request, h) => {
      try {
        const res = await gogsApis.login(request.payload.username, request.payload.password)
        h.code(res.statusCode).response(res.body.sha1)
      } catch (e) {
        h.code(500)
      }
    }
  }
]