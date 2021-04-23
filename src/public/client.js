const showImages = (data) => {

  const imageContainer = document.getElementById('rover-images');
  for (let photo of data) {

    let img = document.createElement("img");
    img.setAttribute("src", photo.img_src)

    imageContainer.appendChild(img);
  }
}


const spirit = document.getElementById("spirit");
  spirit.addEventListener('click', function () {
    getImages('spirit', showImages)
  });

const curiosity = document.getElementById("curiosity");

curiosity.addEventListener('click', function () {
  getImages('curiosity', showImages)
});


const oportunity = document.getElementById("oportunity");

curiosity.addEventListener('click', function () {
  getImages('curiosity', showImages)
});


async function getData(name) {

  try {
  const response = await fetch(`http://localhost:3000/nasaAPI`, {
      headers: {
          'name': name,
      }
  });
  const data = await response.json();
  const roverData = JSON.parse(JSON.stringify(data));
  console.log(roverData.image.photos);
  return roverData.image.photos;

  } catch(error) {
    console.log(error);
  }

}

async function getImages(name, showImages) {
  const data = await getData(name);
  showImages(data);
}
