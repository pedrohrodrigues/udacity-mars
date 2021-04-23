const showImages = (data) => {

  const roverImages = document.getElementById('rover-images');

  for (const photo of data) {
    
    const container = document.createElement("rover-image__container");
    roverImages.appendChild(container);
    const img = document.createElement("img");
    img.setAttribute("src", photo.img)

    container.appendChild(img);
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
  const roverImages = document.getElementById('rover-images');
  roverImages.innerHTML = '<p> loading... </p>';
  try {
  const response = await fetch(`http://localhost:3000/nasaAPI`, {
      headers: {
          'name': name,
      }
  });
  const data = await response.json();
  const roverData = JSON.parse(JSON.stringify(data));
  const rovers = roverData.image.photos.map(p => {
    return roverInfo = {
      name: p.rover.name,
      img: p.img_src,
      launchDate: p.launch_date,
      landingDate: p.landing_date,
      status: p.status,
    }
  });
  return rovers;

  } catch(error) {
    console.log(error);
  } finally {
    roverImages.innerHTML = '';
  }

}

async function getImages(name, showImages) {
  const data = await getData(name);
  showImages(data);
}
