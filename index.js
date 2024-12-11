axios.get("https://jsonplaceholder.typicode.com/users").then((res) =>{
    console.log(res.data);

    const userCards = document.querySelector(".user-cards");
    
    res.data.map((user) =>{
        userCards.innerHTML += `
        <div class="user-card" onclick="userInfo(${user.id})" style="cursor: pointer;">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <p>${user.phone}</p>
        <p>${user.website}</p>
        </div>
        `
    })
   })

   const userInfo =(id)=>{
         window.location.href = "albums.html?user_id=" + id
   }

   document.querySelector("#postsBtn").addEventListener("click", () =>{
    window.location.href = "posts.html"
   })