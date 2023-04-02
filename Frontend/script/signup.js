const onSignup=()=>{
    const payload={
        fistname:document.getElementById("firstname").value,
        lastname:document.getElementById("lastname").value,
        username:document.getElementById("username").value,
        email:document.getElementById("email").value,
        pass:document.getElementById("pass").value
    }
    fetch("https://teal-gifted-gosling.cyclic.app/users/register",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(payload)
    }).then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    window.location.assign("http://127.0.0.1:5500/Frontend/login.html")
}


  
  