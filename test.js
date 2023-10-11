
function utcZeitBekommen(){

    var datum = new Date();

//console.log(datum);

var stunden = datum.getUTCHours();

//console.log(stunden);

var minuten = datum.getMinutes();

//console.log(minuten);


//console.log("änderung: " + minuten);
//console.log("änderung: " + stunden);



//console.log("geänderte Zeit: " + zeit +"UTC");

var zeit = [stunden, minuten];

return zeit;

}


/////////////////////////////////////////////////////////////////////////

function verschiebungInStundenUmrechnen (timezone){

    //DE-timezone: 7200
    var timezone;
    var minuten = 0;
    var stunden = 0;

    while (timezone >= 60) {
        timezone -= 60;
        minuten += 1;
        }
    while (minuten >= 60) {
        minuten -= 60;
        stunden += 1;
        }

// console.log("stunden: " + stunden);
// console.log("minuten: " + minuten);
// console.log("sekunden: " + timezone);

var verschiebung = [stunden, minuten, timezone];

return verschiebung;

}



/////////////////////////////////////////////////////////////////////////
function utcZeitUmrechnen(){

    var utcZeit = utcZeitBekommen();
    
    //timezone = verschiebungInStundenUmrechnen(timezone);

    // console.log("UTC stunden: " + utcZeit[0]);
    // console.log("UTC Minuten: " + utcZeit[1]);

    var zeitverschiebung = verschiebungInStundenUmrechnen(daten.timezone); //!!!!!!!!!!!!!!!!!!!! Hier richtige Zimezone

    // console.log("Zeitverschiebung Stunden: " + zeitverschiebung[0]);
    // console.log("Zeitverschiebung Minuten: " + zeitverschiebung[1]);
    //console.log("Zeitverschiebung Sekunden: " + zeitverschiebung[2]);

    var stundeEchtzeit = utcZeit[0] + zeitverschiebung[0];
    var minuteEchtzeit = utcZeit[1] + zeitverschiebung[1];

    stundeEchtzeit.toString(stundeEchtzeit);
    minuteEchtzeit.toString(minuteEchtzeit);


    if(minuteEchtzeit < 10){

    
        minuteEchtzeit = "0" + minuteEchtzeit;
    }
    if(stundeEchtzeit < 10){
    
        
        stundeEchtzeit = "0" + stundeEchtzeit;
    }

    var ZeitDerStadt = stundeEchtzeit + ":" + minuteEchtzeit;

    // console.log("Zeit der Stadt: " + ZeitDerStadt);

    return ZeitDerStadt;
}

// utcZeitBekommen(), verschiebungInStundenUmrechnen() und utcZeitUmrechnen() waren meine ersten Versuche.













 