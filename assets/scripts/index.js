'use strict'

// const setAPIOrigin = require('../../lib/set-api-origin')
// const config = require('./config')

$('#admin-register').on('click', function () {
  $('#landingPage').addClass('hidden')
  $('#admin').removeClass('hidden')
  $('#actionBtn').addClass('hidden')
})

$('#admin-login').on('click', function () {
  $('#landingPage').addClass('hidden')
  $('#adminSignIn').removeClass('hidden')
  $('#actionBtn').addClass('hidden')
})

$('.home').on('click', function () {
  $('#landingPage').removeClass('hidden')
  $('#admin').addClass('hidden')
  $('#results').addClass('hidden')
  $('#actionBtn').removeClass('hidden')
  $('#adminSignIn').addClass('hidden')
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
      $('#run_time').html(response.plow.last_run_time)
      $('#year').html(response.plow.year_make)
      $('#model').html(response.plow.model)
      console.log('Registered')
      $('#results').removeClass('hidden')
      $('#landingPage').addClass('hidden')
      $('#model-input').val('')
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
      console.log(data)
      console.log(textStatus)
      console.log(jqXhr)
      if (jqXhr.readyState === 4 && jqXhr.status === 200) {
        $('#emailReg').val('')
        $('#passwordReg').val('')
        $('#landingPage').removeClass('hidden')
        $('#crudAdmin').removeClass('hidden')
        $('#adminSignIn').addClass('hidden')
        console.log('Signed In')
      } else {
        console.log('error')
      }
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
      console.log(data)
      console.log(textStatus)
      console.log(jqXhr)
      if (jqXhr.readyState === 4 && jqXhr.status === 200) {
        $('#emailReg').val('')
        $('#passwordReg').val('')
        $('#landingPage').removeClass('hidden')
        $('#crudAdmin').removeClass('hidden')
        $('#adminSignIn').addClass('hidden')
        console.log('Signed In')
      } else {
        console.log('error')
      }
    }
  })
})
// delete CRUD

// $('#delete').on('click', function () {
//   console.log('home click')
//   const input = $('#model-input').val()
//   $.ajax({
//     type: 'DELETE',
//     contentType: 'application/json; charset=utf-8',
//     dataType: 'json',
//     url: 'http://localhost:4741/plows/' + input,
//     success: function (response) {
//       console.log(response)
//       $('#run_time').html(response.plow.last_run_time)
//       $('#year').html(response.plow.year_make)
//       $('#model').html(response.plow.model)
//       console.log('Registered')
//       $('#results').removeClass('hidden')
//       $('#landingPage').addClass('hidden')
//       $('#model-input').val('')
//     }
//   })
// })

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
