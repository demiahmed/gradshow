    
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('sections')[0];

toggleButton.addEventListener('click', () => {

toggleButton.classList.toggle('open')
navbarLinks.classList.toggle('active')
});

const navDropdown = $("#nav-dropdown")
const navDropdownAward = $("#nav-dropdown-award")

navDropdown.hover(() => {
  $("#drop-projects").toggleClass("Xactive")
  $("#drop-projects a ").toggleClass("Yactive")
}, 
() => {
  $("#drop-projects").removeClass("Xactive")
  $("#drop-projects a ").toggleClass("Yactive")

})

navDropdownAward.hover(() => {
  $("#drop-awards").toggleClass("Xactive")
  $("#drop-awards a ").toggleClass("Yactive")

},
() => {
  $("#drop-awards").removeClass("Xactive")
  $("#drop-awards a ").toggleClass("Yactive")

})



