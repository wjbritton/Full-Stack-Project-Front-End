'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('./config')

$('#admin-login').on('click', function () {
  $('#landingPage').addClass('hidden')
  $('#admin').removeClass('hidden')
})

$('.home').on('click', function () {
  $('#landingPage').removeClass('hidden')
  $('#admin').addClass('hidden')
  $('#results').addClass('hidden')
})

$('#searchAdmin').on('click', function () {
  console.log('home click')
  $('#landingPage').removeClass('hidden')
  $('#admin').addClass('hidden')
})

$('#submitModelNum').on('click', function () {
  console.log('home click')
  const input = $('#model-input').val()
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: 'http://localhost:4741/plows/' + input,
    success: function (response) {
      console.log(response)
      $('#run_time').html('Last Run: ' + response.plow.last_run_time)
      $('#year').html('Year Make: ' + response.plow.year_make)
      $('#model').html('Model: ' + response.plow.model)
      console.log('Registered')
      $('#results').removeClass('hidden')
      $('#landingPage').addClass('hidden')
    }
  })
})

$('#adminButton').on('click', function () {
  const valEmail = $('#emailReg').val()
  const valPw = $('#passwordReg').val()
  const jsonData = '{ "credentials": { "email": "' + valEmail + '", "password": "' + valPw + '" }}'
  $.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: jsonData,
    url: 'http://localhost:4741/sign-up/',
    success: function () {
      $('#emailReg').val('')
      $('#passwordReg').val('')
      console.log('Registered')
    }
  })
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
