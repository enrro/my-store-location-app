// content.js
// URL of your proxy server's endpoint
const proxyUrl = 'http://localhost:3000/proxy';
const tcgplayerPattern = /https:\/\/shop\.tcgplayer\.com\/sellerfeedback\/[a-zA-Z0-9_-]+/;
// Function to log the href attribute of an anchor element
function logAnchorHref(event) {
  const element = event.target;
  if (element.tagName === 'A') {
    const href = element.href;
    
    if (tcgplayerPattern.test(href)) {
      const parts = href.split("/");
      const lastPart = parts[parts.length - 1];

      // console.log('Element Href:', href);
      // console.log('last part:', lastPart);
      // Perform a GET request using Fetch API
      const options = {method: 'GET', headers: {accept: 'application/json'}};
      const apiUrl = `https://api.tcgplayer.com/stores/${lastPart}/address`;
      const request = `${proxyUrl}?href=${encodeURIComponent(href)}`;
      console.log('request to sent:', request);
      fetch(request, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
  }
}
  
  // Check if the current frame is the main frame
  if (window === window.top) {
    // Attach event listeners to all elements in the main frame
    const mainFrameElements = document.querySelectorAll('*');
    mainFrameElements.forEach(element => {
      element.addEventListener('mouseover', logAnchorHref);
    });
  }