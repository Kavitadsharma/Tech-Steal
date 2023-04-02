let submit_btn = document.querySelector("#add-button")

submit_btn.addEventListener("click",(event)=>{
    console.log("jyoti")
   event.preventDefault()
   let all_input = document.querySelectorAll("#additem input")
   
   let obj={}
   for(let i=0;i<=all_input.length-1;i++){
    
     obj[all_input[i].id]=all_input[i].value
   }
   addProduct(obj)
})

async function addProduct(obj){
    try {
        console.log(obj)
       let adding_rqst=await fetch("https://teal-gifted-gosling.cyclic.app/product/add",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
       })
       if(adding_rqst.ok){
        alert("added successfully")
        
    }

    } catch (error) {
        alert ("BAD REQUEST")
    }

   
}