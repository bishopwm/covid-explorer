// FETCH CASES DATA

var myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", "8e983a8afemsh48d560cda2e9f8bp1cfb60jsn5380fb86e94b");
myHeaders.append("X-RapidAPI-Host", "coronavirus-monitor.p.rapidapi.com");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
  dataType: 'JSON'
};

let jsondata;

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", requestOptions)
.then(
    function(u){ return u.json();}
  ).then(
    function(json){
      jsondata = json;
    }
  );

// FETCH IMAGE

var url = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/random_masks_usage_instructions.php';

var request = new Request(url);

fetch(request, requestOptions).then((response) => {
  response.arrayBuffer().then((buffer) => {
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(buffer);

    document.querySelector('#mask-image').src = base64Flag + imageStr;
  });
});

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};
