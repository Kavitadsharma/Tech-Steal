let data=[]

fetch("http://localhost:4500/product/all")
    .then(res=>res.json())
    .then(res=>{
        data=res
        renderProduct(res)
    })

    function renderProduct(data){
        let arr = data.filter(function(item){
            return item.ctegory==="TABLETS"
        })
        let new_array = arr.map((item)=>{
            return `<div>
              
              <img src=${item.image}/>
              <h1>${item.name}</h1>
              <h1>${item.price}</h1>
              <div>
              
              <button >Add to cart</button>
              </div>
              <hr>
              
            </div>`
        })
        document.getElementById("all-product").innerHTML=new_array.join(" ")
        
       
    }

    

    function sortlh(){
        let checkBox = document.getElementById("lh")
        if (checkBox.checked == true){
            data.sort((a,b)=>{
                return a.price-b.price
            })
            renderProduct(data)
          }
        
    }
    function sorthl(){
        let checkBox = document.getElementById("hl")
        if (checkBox.checked == true){
            data.sort((a,b)=>{
                return b.price-a.price
            })
            renderProduct(data)
          }
          
    }

    
    document.querySelector("#search").addEventListener("input",searched)
    function searched(){
        let q=document.querySelector("#search").value
        let new_data=data.filter(function(element){
            return element.name.toLowerCase().includes(q.toLowerCase())
        })
        
        renderProduct(new_data)
    }
   

    // document.getElementById("login-register").addEventListener("click",Index);

    // function Index(){
    // window.location.href="./login.html";

    //  }