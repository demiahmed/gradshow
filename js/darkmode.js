// console.log('loading from CDN Darkmode');
window.addEventListener('load', function () {

//changing body color to black
document.body.style.backgroundColor = "black";



//changing all div color to white

const divs = document.getElementsByTagName("DIV")
for(var i=0; i<divs.length;i++){
    // console.log(divs[i])
    divs[i].setAttribute("style", "color:white;")
}
// console.log(divs)

//changing navibar background

const navi = document.querySelectorAll('.navibar')[0]
navi.setAttribute('style','background-color:black;')



//changing the bottom hyperlink to white

const bottomA = document.querySelectorAll(".bottomlinks a")
bottomA[0].setAttribute("style","color:white;")




//changing all SVG icons to inverse

const svgImages = document.querySelectorAll(".contact a img")
for(var i =0;i<svgImages.length;i++){
svgImages[i].setAttribute("style","filter: invert(1);")
}



//changing navbar links to inverse

const navLinks = document.querySelectorAll("li a span")
for(var i =0;i<navLinks.length;i++){
    navLinks[i].setAttribute('style','color:white;')
}



//changing navbar hamburger in mobile to white

const hamburger = document.querySelectorAll("span.line")
// console.log(hamburger[i]);

for (var i =0;i<hamburger.length;i++){
    // console.log(hamburger[i]);
    hamburger[i].style.setProperty("background-color", "white", "important");
}




// addNewStyle(' @media screen and (max-width: 767px) { .toggle-button .line {background-color: white !important;}}')

})

function addNewStyle(newStyle) {
    const styleElement = document.getElementById('styles_js_override');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js_override';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}
