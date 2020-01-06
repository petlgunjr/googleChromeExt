function onPageDetailsReceived(pageDetails) {
  document.getElementById('title').value = pageDetails.title;
  document.getElementById('url').value = pageDetails.url;
  document.getElementById('summary').innerText = pageDetails.summary;
}

let statusDisplay = null;

function addBookmark() {
  event.preventDefault();

  let postUrl = "http://post-test.local.com";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", postUrl, true);

  let title = document.getElementById('title');
  let url = document.getElementById('url');
  let summary = document.getElementById('summary');
  let tags = document.getElementById('tags');

  let params = 'title=' + encodeURIComponent(title.value) + "&url=" + encodeURIComponent(url.value) + "&summary=" + encodeURIComponent(summary.value) + "&tags=" + encodeURIComponent(tags.value);
  params = params.replace(/%20/g, '+');

  let formContentType = 'application/x-www-form-urlencoded';
  xhr.setRequestHeader('Content-type', formContentType);
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      statusDisplay.innerHTML = '';
      if(xhr.status == 200) {
        statusDisplay.innerHTML = "Saved!";
        window.setTimeout(window.close, 1000);
      } else {
        statusDisplay.innerHTML = "Error saving: " + xhr.statusText;
      }
    }
  };

  xhr.send(params);
  statusDisplay.innerHTML = "Saving...";
}

window.addEventListener("load", function(evt) {
  statusDisplay = document.getElementById("status-display");
  document.getElementById("addBookmark").addEventListener("submit", addBookmark);
  chrome.runtime.getBackgroundPage(function(eventPage) {
    eventPage.getPageDetails(onPageDetailsReceived);
  });
});