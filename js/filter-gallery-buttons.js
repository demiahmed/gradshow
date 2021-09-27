//   function btnClass(){

//   var btn = document.getElementsByClassName("button");
//   for (var i=0;i< btn.length;i++){
//       var btnclass = document.getElementsByClassName("button")[i];
//       // console.log(btnclass);
//       btnclass.addEventListener("click",function(e){
//         console.log(btn);
//           e.target.classList.toggle("active");
//       },false);
//   }
// }

//New Hover Effect


// window.addEventListener('load',function(){



// var front = document.querySelectorAll(".front-image")
//  var f = 0


// for(var i=0;i<front.length;i++){
//   o = document.getElementsByClassName("overlay")[i]
//   f  = document.querySelectorAll(".front-image")[i]
//   // console.log(o)
//   o.addEventListener('mouseover',function(e){

//   //f.style.visibility = 'hidden'
//   // ("style","opacity:0;")

//   e.target.style.opacity = '0'
//   frontoff(i)
//   e.previousSibling.style.opacity = '0'
//   // f.setAttribute("style","opacity:0;")
  
// })
// }
// })



function btnClass(){

  var btn = document.getElementsByClassName("button");
  function allOff(){
    for(var i=0;i<btn.length;i++){
      var t = btn[i];
      t.classList.remove("active");
    }
  }
  for (var i=0;i< btn.length;i++){
      var btnclass = document.getElementsByClassName("button")[i];
      // console.log(btnclass);
      btnclass.addEventListener("click",function(e){
          allOff();
          e.target.classList.toggle("active");
      },false);
  }

  var reset = document.querySelectorAll(".resetBtn")[0];
  // console.log(reset);
  reset.addEventListener("click",function(){
    // console.log('pressed reset');
    allOff();
  },false);
}
