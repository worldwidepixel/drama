//SPLASH TEXT

document.onload = init();

function init() {
  //getRandomLine();

  getDrama();
}

/*function getRandomLine() {

    const filename = 'splashes.txt';

    fetch(filename)
        .then(response => response.text())
        .then(content => {
            const lines = content.split('\n').filter(line => line.trim() !== '');
            const randomLine = getRandomElement(lines);
            //document.getElementById('splash').textContent = randomLine;
        })
        .catch(error => console.error('Error loading the file:', error));
}*/

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getDrama() {
  const dramaFile = "drama.json";
  fetch(dramaFile)
    .then((response) => response.text())
    .then((content) => {
      const bracketRegex = /\[(.*?)\]/g;
      const drama = JSON.parse(content);
      //const wordTypes = Object.keys(drama.words);
      let rawString = getRandomElement(drama.schemes);
      let foundMatches = [];
      let f;
      while ((f = bracketRegex.exec(rawString))) {
        foundMatches.push(`[${f[1]}]`);
      }
      let finalString = rawString;
      for (let i = 0; i < foundMatches.length; i++) {
        finalString = finalString.replace(
          foundMatches[i],
          getRandomElement(
            drama.words[foundMatches[i].replace("[", "").replace("]", "")]
          )
        );
      }
      document.getElementById("factReplace").textContent = finalString;
    })
    .catch((error) => console.error("Error loading the file:", error));
}

function shareMastodon() {
  document.getElementById("mastodonInput").style.display = "flex";
  document.getElementById("mastodonButton").style.display = "none";
}

function shareTwitter() {
  var todayFact = document.getElementById("factReplace").textContent;
  var twitterURL = `https://x.com/intent/post?url=Did+you+know..+%3F+${todayFact}+%7C+Dramacraft+by+WorldWidePixel+%7C+https%3A%2F%2Fdrama.worldwidepixel.ca+%23dramacraft+%23satire`;
  window.open(twitterURL);
}

function shareBluesky() {
  var todayFact = document.getElementById("factReplace").textContent;
  var blueskyURL = `https://bsky.app/intent/compose?text=Did you know.. ? ${todayFact} %7C%20Dramacraft%20by%20WorldWidePixel%20%7C%20https%3A%2F%2Fdrama.worldwidepixel.ca%20%23dramacraft%20%23satire`;
  window.open(blueskyURL);
}

function getEnter(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    var mastodonInput = document.getElementById("urlInput");
    var mastodonInstance = mastodonInput.value;
    var todayFact = document.getElementById("factReplace").textContent;
    if (mastodonInstance.indexOf(".") === -1) {
      var mastodonURL = `https://mastodon.social/share?text=Did you know.. ? ${todayFact} | Dramacraft by WorldWidePixel | https://drama.worldwidepixel.ca`;
    } else if (mastodonInstance.indexOf("://") === -1) {
      var mastodonURL = `https://${mastodonInstance}/share?text=Did you know.. ? ${todayFact} | Dramacraft by WorldWidePixel | https://drama.worldwidepixel.ca`;
    } else if (mastodonInstance.indexOf("://") != -1) {
      var mastodonURL = `${mastodonInstance}/share?text=Did you know.. ? ${todayFact} | Dramacraft by WorldWidePixel | https://drama.worldwidepixel.ca`;
    } else {
      var mastodonURL = `https://mastodon.social/share?text=Did you know.. ? ${todayFact} | Dramacraft by WorldWidePixel | https://drama.worldwidepixel.ca`;
    }
    //console.log(mastodonURL);
    window.open(mastodonURL);

    document.getElementById("mastodonInput").style.display = "none";
    document.getElementById("mastodonButton").style.display = "flex";
  }
}
