const photosId =
  new URLSearchParams(window.location.search).get("album_id") || 1;
console.log(photosId);

const photosContainer = document.querySelector("#photos-container");

axios
  .get(`https://jsonplaceholder.typicode.com/photos?albumId=${photosId}`)
  .then((res) => {
    console.log(res.data);
    const photos = res.data;

    photos.forEach((photo) => {
      photosContainer.innerHTML += `
          <div class="photo-card" style="cursor: pointer;" onclick="showPhoto('${photo.url}')">
                    <img src="${photo.thumbnailUrl}" alt="Photo">
                    <div class="card-content">
                        <div class="card-id">ID: ${photo.id}</div>
                        <div class="card-description">Description: ${photo.title}</div>
                    </div>
                </div>
        `;
    });
  });

const showPhoto = (url) => {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  const img = document.createElement("img");
  img.src = url;
  img.style.maxWidth = "80%";
  img.style.maxHeight = "80%";
  img.style.border = "5px solid #fff";
  img.style.borderRadius = "10px";

  modal.appendChild(img);

  document.body.appendChild(modal);

  modal.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
};

