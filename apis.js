
//const connection = new WebSocket('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=190648413527d97a3b655fe296e7fbca&units=metric');
/* alt, Kompliziert und umfangreich
var urlZurApi;
var key = "190648413527d97a3b655fe296e7fbca";
var apiLink1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var stadt = "Hannover";
var apiLink2 = "&appid=";
var apiLink3 = "&units=";
var formatArt = "metric";
*/
//https://api.openweathermap.org/data/2.5/weather?q=Hannover&appid=190648413527d97a3b655fe296e7fbca&units=metric


var apiLink1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var stadt;
var apiLink2 = "&appid=190648413527d97a3b655fe296e7fbca&units=metric";
var urlZurApi;
var daten;


 

//Elemente die direkt auf der Seite angezeigt werden
var  tempMain = document.getElementById("tempMain");
var zeitMain = document.getElementById("zeit");
var beschreibungMain = document.getElementById("description");
var mxTempMain = document.getElementById("mxTempMain");
var minTempMain = document.getElementById("minTempMain");
var gefuelMain = document.getElementById("gefuelMain");
var stadtMain = document.getElementById("StadtMain");

var eingabe = document.getElementById("eingabe");


var body = document.body;


var HintergrundNacht = 'Tageszeiten gifs/Nacht.gif';
var HintergrundTag = 'Tageszeiten gifs/SonnenaufgangUntergang.gif';


var favLeiste = document.getElementById("FavLeiste");





function allesAktualisieren(){

    //Funktion um alles regelmäßig zu aktualisieren. Auch die fenster von den Favorieten
}

function stadtHerausfinden(){

    stadt = eingabe.value;
    
}

function abfrageZusammenbauen() {
    stadtHerausfinden()
    if(stadt == "" || stadt == undefined){
        alert("Bitte gib eine Stadt ein")
    }else{
        urlZurApi = apiLink1 + stadt + apiLink2;
        //urlZurApi = apiLink1 + stadt + apiLink2 + key + apiLink3 + formatArt;
        //console.log(urlZurApi);
    }

}

 

function abfragen() {
    abfrageZusammenbauen();

    

    fetch(urlZurApi)
        .then(function (response) { return response.json(); })
        .then(function (data) {/*  console.log(data.weather.main); */  daten = data; aktualisierenMain()  })
        .catch(function (error) { console.log(error); });
        
   
  
    
}

function aktualisierenMain(){

    
    symbolAendern();
    stadtMain.innerHTML = stadt;

    tempMain.innerHTML = KommastellenEntfernen(daten.main.temp);
    zeitMain.innerHTML = StandortzeitBekommen(daten.timezone) + "Uhr";
    beschreibungMain.innerHTML = daten.weather[0].description;
    mxTempMain.innerHTML = KommastellenEntfernen(daten.main.temp_max);
    minTempMain.innerHTML = KommastellenEntfernen(daten.main.temp_min);
    gefuelMain.innerHTML = KommastellenEntfernen(daten.main.feels_like);
   
    

  


}



function KommastellenEntfernen(variable){


    var zahlOhneKomma = variable.toString().split(".")[0];

    var fertig = parseInt(zahlOhneKomma);

    //console.log(typeof(fertig)); 

    return fertig;
    
}


var stundenAlsInt; //Diese Variable ist dafür da, um die Zeit der Abgefragten stadt als number/int zu speichern und als übergabeparameter zu verwenden um den hintergrung zu ändern

function StandortzeitBekommen(timezone){


    //timezone -> Zeitzone (Zeitverschiebung), die von der Api geliefert wird

  
    var jetzt = new Date();
  
    var offsetInMilliseconds = timezone * 1000;
  
    var zeitInDerZeitzone = new Date(jetzt.getTime() + offsetInMilliseconds);
  
   
  
    // Die Uhrzeit in der angegebenen Zeitzone anzeigen
  
    var stunden = zeitInDerZeitzone.getUTCHours();
  
    var minuten = zeitInDerZeitzone.getUTCMinutes();

    stundenAlsInt = stunden; //Diese Variable ist dafür da, um die Zeit der Abgefragten stadt als number/int zu speichern und als übergabeparameter zu verwenden um den hintergrung zu ändern
  
    
        if(minuten < 10){
  
      
          minuten = "0" + minuten;
      }
      if(stunden < 10){
      
          
          stunden = "0" + stunden;
      }
  
      var zeit = stunden + ":" + minuten

      hintergrundÄndern(); //!!!!!!!!!!Muss unbedingt entfernt werden!!!!!!!!!!!!!!!!!!
  
      return zeit
  
  }

  function hintergrundÄndern(){
    
    console.log("Stunden an den ich mich orientiere: " + stundenAlsInt + " Typ der Variable: " + typeof(stundenAlsInt));
    
    
    if (stundenAlsInt < 6 ){

        

        console.log("Es ist Nacht")
        body.style.backgroundImage = "url('" + HintergrundNacht + "')";
        

    }
    if(stundenAlsInt >= 21){

        body.style.backgroundImage = "url('" + HintergrundNacht + "')";
    }
    if(stundenAlsInt > 5 && stundenAlsInt < 21){

        console.log("Es ist Tag");
        body.style.backgroundImage = "url('" + HintergrundTag + "')";

    }

    /*
    if (stundenAlsInt < 6 || stundenAlsInt >= 21){

        console.log("Es ist Nacht")
        body.style.backgroundImage = "url('" + HintergrundNacht + "')";
        

    }
    if(stundenAlsInt > 5 && stundenAlsInt < 21){

        console.log("Es ist Tag");
        body.style.backgroundImage = "url('" + HintergrundTag + "')";

    }*/
    // Ändern Sie die Hintergrundbild-URL
   

  }

  function stadtSpeichern(){


    favLeiste.innerHTML += `

    <div class="Fav1">

    <p class="FavStadt">London</p>
    
    <svg xmlns=http://www.w3.org/2000/svg width="20" height="20" fill="red" viewBox="0 0 16 16" class="exit" onclick="favEntfernen()" >

        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>

        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>

      </svg>


    

    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" viewBox="0 0 16 16" class="Favsymbol">
        <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
        <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
      </svg>
      

    <p class="FavTemp">22°</p>

</div> `


  }

  function favEntfernen(){

  }


