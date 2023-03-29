var Images = [
    "https://img.gkbcdn.com/bn/2205/1500x260-628f67db2b40c91f8ca376f8._p1_.jpg",
    "https://img.gkbcdn.com/bn/2212/5-63ac10cc2b40c966cc189a8e._p1_.jpg"
   
  ]
  let kavita=document.getElementById("slideshow")
  
  let i = 0;
  
  setInterval(function () {
      Images.forEach((element,index)=>{
          if(i===index){
      let myImg=document.createElement("img")
      myImg.setAttribute("src",element)
      kavita.innerHTML=null
  kavita.append(myImg)
          }
  });
      
     i++
     
   if(i>=Images.length){
      i=0
     }
  }, 3000);