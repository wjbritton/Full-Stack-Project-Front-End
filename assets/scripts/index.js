'use strict'

// ToDos

// Change password UI and ajax
// Change plow UI and ajax
// Delete Plow UI and ajax
const url = ' https://rocky-caverns-21242.herokuapp.com'
let loggedIn = 0
let userId, token, plowId

$('#admin-register').on('click', function () {
  $('#landingPage').addClass('hidden')
  $('#actionBtn').addClass('hidden')
  $('#admin').removeClass('hidden')
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
  $('#adminSignIn').addClass('hidden')
  $('#idStats').addClass('hidden')
  if (loggedIn === 1) {
    console.log('1')
    $('#actionBtn').addClass('hidden')
    $('#addPlow').removeClass('hidden')
  } else {
    console.log('0')
    $('#actionBtn').removeClass('hidden')
  }
})

$('#Admin').on('click', function () {
  console.log('home click')
  $('#landingPage').removeClass('hidden')
  $('#admin').addClass('hidden')
})

$('.search').on('click', function () {
  console.log('home click')
  $('#landingPage').removeClass('hidden')
  $('#addPlow').removeClass('hidden')
  $('#crudAdmin').addClass('hidden')
  $('#results').addClass('hidden')
  $('#inputPlow').addClass('hidden')
  $('#passwordChange').addClass('hidden')
  $('#editPage').addClass('hidden')
})

$('#add').on('click', function () {
  console.log('Add Plow')
  $('#inputPlow').removeClass('hidden')
  $('#landingPage').addClass('hidden')
  $('#addPlow').addClass('hidden')
})

$('#changePw').on('click', function () {
  console.log('Password Change!')
  $('#passwordChange').removeClass('hidden')
  $('#landingPage').addClass('hidden')
  $('#addPlow').addClass('hidden')
})

$('#submitModelNum').on('click', function () {
  console.log('home click')
  const input = $('#model-input').val()
  console.log(loggedIn)
  if (loggedIn === 1) {
    $('.home').addClass('hidden')
  } else {
    $('.home').removeClass('hidden')
  }
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: url + '/plows/' + input,
    success: function (response, textStatus, jqXhr) {
      plowId = response.plow.id
      if (jqXhr.readyState === 4 && jqXhr.status === 200) {
        $('#timeRun').html(response.plow.last_run_time)
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
    url: url + '/sign-up',
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
    url: url + '/sign-in',
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
    url: url + '/sign-out/' + userId,
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

$('#addPlowBtn').on('click', function () {
  console.log('Plow Added')
  const timeInput = $('#timeAdd').val()
  const yearInput = $('#yearAdd').val()
  const modelInput = $('#modelAdd').val()
  const plowData = '{ "plows": { "last_run_time": "' + timeInput + '", "year_make": "' + yearInput + '", "model": ' + modelInput + '}}'
  console.log(plowData + '  ' + userId)
  $.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: plowData,
    url: url + '/plows/',
    success: function (data, textStatus, jqXhr) {
      plowId = data.plow.id
      console.log(plowId + '  ' + textStatus + '  ' + JSON.stringify(jqXhr))
      $('#inputPlow').addClass('hidden')
      $('#idStats').removeClass('hidden')
      $('#plowID').html(plowId)
      $('#timeAdd').val('')
      $('#yearAdd').val('')
      $('#modelAdd').val('')
    }
  })
})

$('#changePwBtn').on('click', function () {
  const inputOld = $('#oldPw').val()
  const inputNew = $('#newPw').val()
  const pwData = '{"passwords": {"old": "' + inputOld + '", "new": "' + inputNew + '"}}'
  console.log(pwData + ' ' + token)
  $('#oldPw').val('')
  $('#newPw').val('')
  $.ajax({
    url: url + '/change-password/' + userId,
    headers: {Authorization: 'Token token=' + token},
    contentType: 'application/json; charset=utf-8',
    type: 'PATCH',
    data: pwData,
    success: function (data, textStatus, jqXhr) {
      $('#passwordChange').addClass('hidden')
      $('#landingPage').removeClass('hidden')
      $('#addPlow').removeClass('hidden')
    }
  })
})

$('#delete').on('click', function () {
  console.log(JSON.stringify(plowId))
  $.ajax({
    url: url + '/plows/' + plowId,
    headers: {
      Authorization: 'Token token=' + token
    },
    method: 'DELETE'
  })
})

$('#edit').on('click', function () {
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: url + '/plows/' + plowId,
    success: function (response, textStatus, jqXhr) {
      plowId = response.plow.id
      $('#timeRunEdit').val(response.plow.last_run_time)
      $('#yearEdit').val(response.plow.year_make)
      $('#modelEdit').val(response.plow.model)
      $('#editPage').removeClass('hidden')
      console.log('editGet!')
      $('#results').addClass('hidden')
      $('#actionBtn').addClass('hidden')
    }
  })
})

$('#editPlowBtn').on('click', function () {
  const timeEdit = $('#timeRunEdit').val()
  const yearEdit = $('#yearEdit').val()
  const modelEdit = $('#modelEdit').val()
  const updatedPlow = '{ "plows": { "last_run_time": "' + timeEdit + '", "year_make": "' + yearEdit + '", "model": ' + modelEdit + '}}'
  $.ajax({
    url: url + '/plows/' + plowId,
    headers: {Authorization: 'Token token=' + token},
    contentType: 'application/json; charset=utf-8',
    type: 'PATCH',
    data: updatedPlow,
    success: function () {
      console.log('Successful Edit')
      $('#crudAdmin').addClass('hidden')
      $('#editPage').addClass('hidden')
    }
  })
})
