const got = require('got')

const baseUrl = `https://gogs.erguotou.me/api/v1/`

function base64Encode (str) {
  return Buffer.from(str).toString('base64')
}

function encodeUserAuth (user) {
  if (!user) return null
  if (user.token) {
    return `token ${user.token}`
  }
  return `Basic ${base64Encode(`${user.username}:${user.password}`)}`
}

module.exports = function request (apiUrl, user, method = 'get', body) {
  const auth = encodeUserAuth(user)
  const options = {
    baseUrl,
    timeout: 3000,
    method,
    json: true
  }
  if (auth) {
    options.headers = { 'Authorization': auth }
  }
  if (body) {
    options.body = body
  }
  return got(apiUrl, options)
}