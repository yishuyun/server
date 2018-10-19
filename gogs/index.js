'use strict';
const request = require('./request')

const apis = {
  login: function login (username, password) {
    return request(`users/${username}/tokens`, {
      username,
      password
    }, 'post', {
      name: 'token'
    })
  }
}

module.exports = apis