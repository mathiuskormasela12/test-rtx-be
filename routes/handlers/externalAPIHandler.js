'use strict'

const fetch = require("node-fetch-commonjs");
const config = require('../../config.js');

const functions = {
  getListFromAPI: async function () {
    const path = '/search/sgsg';
  
    const res = await fetch(`${config.source.url}${path}`, {
      compress: true,
      timeout: 60e3, // 60s timeout as default
      follow: 0,
      headers: {
        'content-type': 'application/json'
      }
    }).catch(err => {
      console.log('Some error!');
      throw err
    })

    // 7. Return response from external API
    return res.json();
  }
}

module.exports =  functions;

