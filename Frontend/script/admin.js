let submit_btn = document.querySelector("#login-button")


submit_btn.addEventListener("click",(event)=>{
   
   event.preventDefault()
   
   let all_input = document.querySelectorAll("#login input")
   
   let obj={}
   for(let i=0;i<=all_input.length-1;i++){
    
     obj[all_input[i].id]=all_input[i].value
   }
   
   loginUser(obj)
})

 function loginUser(obj){
    fetch("http://localhost:4500/users/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
       }).then(res=>res.json())
        .then(res=>{
            if(res){
                alert("loggin successful")
                window.location.href="adminpage.html"
            }else{
                alert("please register first")
            }
        })
       


   
}