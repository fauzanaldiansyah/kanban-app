const URL = "http://localhost:3000/"
let kanbanCurrentId = null

$(document).ready(function(){
    auth()
})

function auth(){
    if(localStorage.access_token){
        $('.login-page').hide()
        $('.home-page').show()
        $('.add-form-page').hide()
        $('.update-form-page').hide()
        $('.register-form-page').hide()
        getTask()
    }
    else{
        $('.home-page').hide()
        $('.login-page').show()
        $('.add-form-page').hide()
        $('.update-form-page').hide()
        $('.register-form-page').hide()
    }
}

function addFormPage(){
    $('.home-page').hide()
    $('.add-form-page').show()
    $('.update-form-page').hide()
    $('.register-form-page').hide()
}

function registerFormPage(){
    $('.home-page').hide()
    $('.login-page').hide()
    $('.add-form-page').hide()
    $('.update-form-page').hide()
    $('.register-form-page').show()
}

function toHome(){
    $('.home-page').show()
    $('.add-form-page').hide()
    $('.update-form-page').hide()
    $('.register-form-page').hide()
}

function editFormPage(id){
    kanbanCurrentId = id
    $.ajax({
        method : 'get',
        headers: {
            access_token: localStorage.access_token
        },
        url : URL + `tasks/${id}`
    })
    .done(data => {
        $('.home-page').hide()
        $('.add-form-page').hide()
        $('.update-form-page').show()
        $('#title-edit').val(data.title)
        $('#category-edit').val(data.category)
    })
    .fail(err => {
        console.log(err)
    })
}

function editTask(event){
    event.preventDefault()
    let title = $('#title-edit').val()
    let category = $('#category-edit').val()
    console.log(title,category)
    $.ajax({
        method: 'put',
        url : URL + `tasks/${kanbanCurrentId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: { title, category }
    })
    .done(data => {
        toHome()
        getTask()
    })
    .fail(err => {
        console.log(err)
    })
}

function addTask(event){
    event.preventDefault()
    let title = $('#title').val()
    let category = $('#category').val()
    $.ajax({
        method: 'post' ,
        url: URL + 'tasks',
        headers: {
            access_token: localStorage.access_token
        },
        data : {
            title, category
        }
    })
    .done(data => {
        getTask()
        toHome()
    })
    .fail(err => {
        console.log(err.responseJSON.errors)
    })  
    .always(_ => {
        $('#title').val('')
        $('#category').val('')
      })
}       

function logout(){
    localStorage.clear()
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    auth()
}

function getTask(){
    $.ajax({
        method: 'get',
        url : URL + 'tasks',
        headers : {access_token: localStorage.access_token}
    })
    .done(data => {
        $('#tasks-data').empty()
        data.forEach(element => {
            $('#tasks-data').append(

                `
                    <tr id = 'tasks-row'>
                        <td class="font-weight-bold">  ${element.title} </td>
                        <td> ${element.category} </td>
                        <td> <button class="btn btn-secondary btn-sm" onclick="editFormPage(${element.id})"> Edit  </button> 
                            <button class="btn btn-secondary btn-sm" onclick="deleteTask(${element.id})"> Delete  </button> 
                        </td>
                    </tr>
            `
            )
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTask(id){
    $.ajax({
        method : 'delete',
        url: URL + `tasks/${id}`,
        headers : {
            access_token: localStorage.access_token
        }
    })
    .done(data => {
        auth()
    })
    .fail(err => {
        console.log(err.responseJSON.errors)
    })
}


function login(event){
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    console.log(email,password)
    $.ajax({
        method: 'post',
        url : URL + 'users/login',
        data: {
            email, password
        }
    })
    .done(data => {
        console.log(data, '<<<data')
        localStorage.setItem('access_token',data.access_token)
        auth()
    })
    .fail(err => {
        console.log(err.responseJSON.errors)
    })
    .always(_ => {
        $('#email-login').val('')
        $('#password-login').val('')
      })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token
    auth()
    $.ajax({
        method: 'post',
        url : URL + 'users/googlesign', 
        data : {
            id_token
        }
    })
    .done(result => {
        console.log(result, result.data.access_token, '<<<<data')
        localStorage.setItem('access_token', result.data.access_token)
        auth()
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.disconnect()
    })
    .fail(err => {
        console.log(err.responseJSON)
    })
}

function registerUser(event){
    event.preventDefault()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    let organization = $('#organization-register').val()
    $.ajax({
        method: 'post' ,
        url: URL + 'users/register',
        data : {
            email, password, organization
        }
    })
    .done(data => {
        auth()
    })
    .fail(err => {
        console.log(err)
    })  
    .always(_ => {
        $('#email-register').val('')
        $('#password-register').val('')
        $('#organization-register').val('')
      })
}     