'use strict';

const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')

const pkg = require('./package.json')
const routers = require('./routers')

async function start () {
  try {
    // create server
    const server = Hapi.server({
      host: 'localhost',
      port: 8000
    })

    // plugins
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: { title: 'Api Document', version: pkg.version }
        }
      }
    ])

    // routers
    routers.forEach(router => {
      server.route(router)
    })

    // start
    await server.start()
    console.log('Server running at: ', server.info.uri)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

start()