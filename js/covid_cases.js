/// API DATA

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