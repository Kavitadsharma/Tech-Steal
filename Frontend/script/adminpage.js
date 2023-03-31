fetch("http://localhost:4500/product/all")
.then(res=>res.json())
.then(res=>{
    renderProduct(res)
})

function renderProduct(data){
    let new_array = data.map((item)=>{
        return `<div>
          
          <img src=${item.image}/>
          <h1>${item.name}</h1>
          <h1>${item.price}</h1>
          <div>
          <button>Update</button>
          <button class=delete data-id = ${item._id}>Delete</button>
          </div>
          <hr>
          
        </div>`
    })
    document.getElementById("all-product").innerHTML=new_array.join(" ")
    let all_delete_btns = document.querySelectorAll(".delete")

    for(delete_btn of  all_delete_btns){
        delete_btn.addEventListener("click",(event)=>{
             let id = event.target.dataset.id
             dellete(id)
        })
    }
}

function dellete(id){
    fetch(`http://localhost:4500/product/delete/${id}`,{
        method:"PUT"
    })
    .then(res=>res.json())
    .then(res=>{
    renderProduct(res)
})
}