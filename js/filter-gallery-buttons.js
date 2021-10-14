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
