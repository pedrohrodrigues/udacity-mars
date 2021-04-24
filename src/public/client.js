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
    getImages('spirit', showRoverData)
  });

const curiosity = document.getElementById("curiosity");

curiosity.addEventListener('click', function () {
  getImages('curiosity', showRoverData)
});


const opportunity = document.getElementById("opportunity");

opportunity.addEventListener('click', function () {
  getImages('opportunity', showRoverData)
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
      launchDate: p.rover.launch_date,
      landingDate: p.rover.landing_date,
      status: p.rover.status,
    }
  });
  return rovers;

  } catch(error) {
    roverImages.innerHTML = 'An error has occured, please try again';
  } finally {
    roverImages.innerHTML = '';
  }

}

function showRoverData(data, showImages) {
  const roverInfo = Immutable.Map({
    launchDate:  data[0].launchDate,
    landingDate:  data[0].landingDate,
    status:  data[0].status,
  })
  const roverInfoElement = document.getElementById('rover-info');
  const launchDateElement = document.getElementById('launch-date');
  const landingDateElement = document.getElementById('landing-date');
  const statusElement = document.getElementById('status');

  roverInfoElement.style.display = 'flex';
  launchDateElement.innerText = roverInfo.get('launchDate');
  landingDateElement.innerText = roverInfo.get('landingDate');
  statusElement.innerText = roverInfo.get('status');
  
  showImages(data);
}
async function getImages(name, showRoverData) {
  const data = await getData(name);
  showRoverData(data, showImages);
}
