document.addEventListener("DOMContentLoaded", () => {
  const product_id =
    new URLSearchParams(window.location.search).get("user_id") || 1;
  console.log("User ID:", product_id);

  const albumsContainer = document.querySelector(".Albums");
  const loadingSpinner = document.getElementById("loading-spinner");

  // Show loading spinner
  if (loadingSpinner) {
    loadingSpinner.style.display = "flex";
  }

  axios
    .get(`https://jsonplaceholder.typicode.com/albums?userId=${product_id}`)
    .then((res) => {
      const albums = res.data;
      console.log("Albums data:", albums);

      albums.forEach((album) => {
        albumsContainer.innerHTML += `
              <div class="album-card" style="cursor: pointer;" onclick=photosPage(${album.id})>
                <h3>${album.title}</h3>
                <p>Album ID: ${album.id}</p>
              </div>
            `;
      });
    })
    .catch((error) => {
      console.error("Error fetching album data:", error);
      if (albumsContainer) {
        albumsContainer.innerHTML =
          "<p>Error loading albums. Please try again later.</p>";
      }
    })
    .finally(() => {
      if (loadingSpinner) {
        loadingSpinner.style.display = "none";
      }
    });
});

const photosPage = (id) => {
  window.location.href = `photos.html?album_id=${id}`;
};
