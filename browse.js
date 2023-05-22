function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function loadpage() {
  let url = document.getElementById("url").value;
  let content = document.getElementById("content");

  content.textContent = '';
  
  if (url[0] != '@') {
    let textNode = document.createTextNode("Error: Invalid url");
    
    content.appendChild(textNode);

    return;
  }
  
  let theUrl = "http://" + url.split(":")[0] + "/" + url.split(":")[1]
  let text = httpGet(theUrl);

  let lines = text.split("\n");
  
  for (const line of lines) {
    if (line.startsWith("> ")) {
      var btn = document.createElement("button");
      var btnText = line.slice(2).split(":")[0].trim();
      var btnUrl = line.slice(2).split(":")[1].trim();
      btn.textContent = btnText;
      btn.setAttribute("onClick", "document.getElementById(\"url\").value = \"" + btnUrl + "\"; loadpage();");

      content.appendChild(btn);
    } else if (line.startsWith("- ")) {
    } else {
      let textNode = document.createTextNode(line);
      content.appendChild(textNode);
    }
    var br = document.createElement("br");
    
    content.appendChild(br);
  }
}
