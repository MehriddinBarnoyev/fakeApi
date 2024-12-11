document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".user-posts-container");
  const modal = document.createElement("div");
  modal.className = "modal";
  document.body.appendChild(modal);

  Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/users"),
    axios.get("https://jsonplaceholder.typicode.com/posts"),
  ])
    .then(([usersRes, postsRes]) => {
      const users = usersRes.data;
      const posts = postsRes.data;

      users.forEach((user) => {
        const userPosts = posts.filter((post) => post.userId === user.id);
        if (userPosts.length > 0) {
          const userCardWrapper = document.createElement("div");
          userCardWrapper.className = "user-card-wrapper";

          const userCard = document.createElement("div");
          userCard.className = "user-card";

          const firstPost = userPosts[0];
          userCard.innerHTML = `
                    <div class="user-info">
                        <h2 class="user-name">${user.name}</h2>
                    </div>
                    <div class="post">
                        <h3 class="post-title">${firstPost.title}</h3>
                        <p class="post-body">${firstPost.body.length > 80 ? firstPost.body.slice(0, 80) + "..." : firstPost.body}</p>
                        <button class="show-more-btn">Show More Posts</button>
                    </div>
                `;

          const morePostsSide = document.createElement("div");
          morePostsSide.className = "more-posts-side";

          userCardWrapper.appendChild(userCard);
          userCardWrapper.appendChild(morePostsSide);

          const showMoreBtn = userCard.querySelector(".show-more-btn");

          showMoreBtn.addEventListener("click", () => {
            const morePosts = userPosts
              .slice(1)
              .map(
                (post) => `
                        <div class="more-post">
                            <h4 class="post-title">${post.title}</h4>
                            <p class="post-body">${post.body}</p>
                        </div>
                    `
              )
              .join("");

            modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <h2>${user.name}'s Posts</h2>
                            ${morePosts}
                        </div>
                    `;
            modal.style.display = "block";

            const closeModal = modal.querySelector(".close-modal");
            closeModal.addEventListener("click", () => {
              modal.style.display = "none";
            });

            window.addEventListener("click", (event) => {
              if (event.target === modal) {
                modal.style.display = "none";
              }
            });
          });

          container.appendChild(userCardWrapper);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      container.innerHTML =
        "<p>Error loading user posts. Please try again later.</p>";
    });
});
