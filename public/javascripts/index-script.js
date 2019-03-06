/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction(x) {
    x.classList.toggle("change");
    document.getElementById("menu").classList.toggle("show");
    document.getElementById("spacer").classList.toggle("spacedown");
  }

// Buttons for sign in and log in
var signupRecycler = $('#signup-recycler');
var loginRecycler = $('#login-recycler');
var signupUpcycler = $('#signup-upcycler');
var loginUpcycler = $('#login-upcycler');
var cross = $('.cross');

cross.click(() => {
  $('.form-section-signup-recycler-wrapper').addClass('hide').removeClass('show')
  $('.form-section-login-recycler-wrapper').addClass('hide').removeClass('show')
  $('.form-section-signup-upcycler-wrapper').addClass('hide').removeClass('show')
  $('.form-section-login-upcycler-wrapper').addClass('hide').removeClass('show')
})

signupRecycler.click(() => {
  $('.form-section-signup-recycler-wrapper').addClass('show').removeClass('hide');
})

loginRecycler.click(() => {
  $('.form-section-login-recycler-wrapper').addClass('show').removeClass('hide');
})

signupUpcycler.click(() => {
  $('.form-section-signup-upcycler-wrapper').addClass('show').removeClass('hide')
})

loginUpcycler.click(() => {
  $('.form-section-login-upcycler-wrapper').addClass('show').removeClass('hide')
})  