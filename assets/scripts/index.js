'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('./config')

let loggedIn = 0
let userId, token

$('#admin-register').on('click', function () {
  $('#landingPage').addClass('hidden')
  $('#admin').removeClass('hidden')
  $('#actionBtn').addClass('hidden')
  $('#results').addClass('hidden')
})

$('#admin-login').on('click', function () {
  $('#landingPage').addClass('hidden')
  $('#adminSignIn').removeClass('hidden')
  $('#actionBtn').addClass('hidden')
  $('#results').addClass('hidden')
})

$('.home').on('click', function () {
  $('#landingPage').removeClass('hidden')
  $('#admin').addClass('hidden')
  $('#results').addClass('hidden')
  $('#actionBtn').removeClass('hidden')
  $('#adminSignIn').addClass('hidden')
})

$('#Admin').on('click', function () {
  console.log('home click')
  $('#landingPage').removeClass('hidden')
  $('#admin').addClass('hidden')
})

$('#search').on('click', function () {
  console.log('home click')
  $('#landingPage').removeClass('hidden')
  $('#addPlow').removeClass('hidden')
  $('#crudAdmin').addClass('hidden')
  $('#results').addClass('hidden')
})

$('#add').on('click', function () {
  console.log('Add Plow')
  $('#inputPlow').removeClass('hidden')
  // $('#landingPage').addClass('hidden')
  // $('#addPlow').addClass('hidden')
})

$('#submitModelNum').on('click', function () {
  console.log('home click')
  const input = $('#model-input').val()
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: 'http://localhost:4741/plows/' + input,
    success: function (response, textStatus, jqXhr) {
      console.log(response)
      if (jqXhr.readyState === 4 && jqXhr.status === 200) {
        $('#run_time').html(response.plow.last_run_time)
        $('#year').html(response.plow.year_make)
        $('#model').html(response.plow.model)
        console.log('Registered')
        $('#results').removeClass('hidden')
        $('#landingPage').addClass('hidden')
        if (loggedIn === 1) {
          $('#crudAdmin').removeClass('hidden')
          $('#addPlow').addClass('hidden')
        }
        $('#model-input').val('')
      }
    }
  })
})

$('#adminButton').on('click', function () {
  const valEmail = $('#emailReg').val()
  const valPw = $('#passwordReg').val()
  const jsonData = '{ "credentials": { "email": "' + valEmail + '", "password": "' + valPw + '", "password_confirmation": "' + valPw + '" }}'
  console.log(jsonData)
  $.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: jsonData,
    url: 'http://localhost:4741/sign-up',
    success: function () {
      $('#emailReg').val('')
      $('#passwordReg').val('')
      console.log('Registered')
      $('#adminSignIn').removeClass('hidden')
      $('#admin').addClass('hidden')
    }
  })
})

$('#signIn').on('click', function () {
  const valEmail = $('#emailLog').val()
  const valPw = $('#passwordLog').val()
  const jsonData = '{ "credentials": { "email": "' + valEmail + '", "password": "' + valPw + '" }}'
  console.log(jsonData)
  $.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: jsonData,
    url: 'http://localhost:4741/sign-in',
    success: function (data, textStatus, jqXhr) {
      $('#emailLog').val('')
      $('#passwordLog').val('')
      userId = JSON.parse(jqXhr.responseText).user.id
      token = JSON.parse(jqXhr.responseText).user.token
      if (jqXhr.readyState === 4 && jqXhr.status === 200) {
        $('#landingPage').removeClass('hidden')
        $('#adminSignIn').addClass('hidden')
        $('#addPlow').removeClass('hidden')
        console.log('Signed In')
        loggedIn = 1
      } else {
        console.log('error')
      }
    }
  })
})

$('#logOut').on('click', function () {
  const valEmail = $('#emailLog').val()
  const valPw = $('#passwordLog').val()
  const jsonData = '{ "credentials": { "email": "' + valEmail + '", "password": "' + valPw + '" }}'
  console.log(jsonData)
  $.ajax({
    type: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: jsonData,
    url: 'http://localhost:4741/sign-out/' + userId,
    headers: {
      Authorization: 'Token token=' + token
    },
    success: function () {
      $('#addPlow').addClass('hidden')
      $('#actionBtn').removeClass('hidden')
      loggedIn = 0
      console.log('Deleted!')
    }
  })
})

// $('#addPlow').on('click', function () {
//   console.log('home click')
//   const timeInput = $('#timeAdd').val()
//   const yearInput = $('#yearAdd').val()
//   const modelInput = $('#modelAdd').val()
//
//   // "plows": {
//   //     "last_run_time": "11:00:00",
//   //     "year_make": "2014",
//   //     "model": "SS-8-TE"
//   //   }
//
//   const plowData = '{ "plows": { "last_run_time": "' + timeInput + '", "year_make": "' + yearInput + '", "model": "' + modelAdd + "}}'"
//   console.log(plowData)
//   $.ajax({
//     type: 'POST',
//     contentType: 'application/json; charset=utf-8',
//     dataType: 'json',
//     data: plowData,
//     url: 'http://localhost:4741/plows/2',
//     success: function (data, textStatus, jqXhr) {
//       console.log('Registered  ', jqXhr)
//     }
//   })
// })

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
