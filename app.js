const url = "https://spencer-storage.s3-us-west-2.amazonaws.com"; // DEV Only

const main = () => {

  fetch(url)
  .then(res => res.text())
  .then(getLinks)
  .then(startImageCycle)
  .catch(errorLogger);
};

const errorLogger = err => console.log("Error!", err);

const getLinks = async xmlText => {
  let keys = [];

  while ( xmlText.includes("<Key>") ) {
    keys.push(
      xmlText.substring(
        xmlText.indexOf("<Key>") + 5,
        xmlText.indexOf("</Key>")
      )
    );

    xmlText = xmlText.substring(xmlText.indexOf("</Key>") + 6);
  }

  return [ ...keys.filter(key => {
    return key !== "gallery/" && key.includes("gallery/");
  }) ];
};

const startImageCycle = links => {
  let index = 0;
  const galleryImage = document.getElementById("galleryImage");
  galleryImage.src = `${url}/${links[index]}`;

  setInterval(() => {
    if ( window.innerWidth >= 1230 ) {

      if ( index <= links.length - 2 ) {
        index++;
      } else {
        index = 0;
      }

      galleryImage.src = `${url}/${links[index]}`;
      galleryImage.animate([
        {
          opacity: 0.2
        },
        {
          opacity: 1
        }
      ], 800);

    }
  }, 2500)

};

window.addEventListener("load", main);