/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction(x) {
    x.classList.toggle("change");
    document.getElementById("menu").classList.toggle("show");
    document.getElementsByClassName("jumbo-section")[0].classList.toggle("spacedown");
  }

// Buttons for sign in and log in
var loginRecycler = $('#login-recycler');
var signupUpcycler = $('#signup-upcycler');
var loginUpcycler = $('#login-upcycler');
var cross = $('.cross');

loginRecycler.click(() => {
  $('.form-section-login-recycler-wrapper').addClass('show').removeClass('hide');
})

cross.click(() => {
  $('.form-section-login-recycler-wrapper').addClass('hide').removeClass('show')
  $('.form-section-signup-upcycler-wrapper').addClass('hide').removeClass('show')
  $('.form-section-login-upcycler-wrapper').addClass('hide').removeClass('show')
})

signupUpcycler.click(() => {
  $('.form-section-signup-upcycler-wrapper').addClass('show').removeClass('hide')
})

loginUpcycler.click(() => {
  $('.form-section-login-upcycler-wrapper').addClass('show').removeClass('hide')
})  