window.addEventListener('load',function(){
document.querySelectorAll(".navibar")[0].setAttribute("style","background: rgb(255,255,255);");
document.querySelectorAll(".navibar")[0].setAttribute("style","background: rgba(0,0,0,0.8)");
})


function backToTop() {
    window.scrollTo(0,0)
    return false; //prevent page from reloading
}