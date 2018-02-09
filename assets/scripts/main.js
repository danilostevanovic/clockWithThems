var godina = new Date();
var trenutnaGodina = godina.getFullYear();
var novaGodina = 'December 31 '+trenutnaGodina+' 23:59:59 UTC+01:00';
var nekiDatum = 'Decembar 21 ' + trenutnaGodina + ' 19:10:00 UTC+01:00';


console.log('tenutna goddina: ', trenutnaGodina);

function krajNoveGodine(kraj) {
    var date = new Date(kraj) - new Date();
    var seconds = Math.floor((date / 1000) % 60);
    var minutes = Math.floor((date / 1000 / 60) % 60);
    var hours = Math.floor((date / (1000 * 60 * 60)) % 24);
    var days = Math.floor(date / (1000 * 60 * 60 * 24));

    return {
        preostalo: date,
        dana: days,
        sati: hours,
        minuta: minutes,
        sekundi: seconds
    };
}
console.log(krajNoveGodine(novaGodina).preostalo);

function sat(spanDani, spanSati, spanMinuti, spanSekundi, datum) {
    spanDani = document.getElementById(spanDani);
    spanSati = document.getElementById(spanSati);
    spanMinuti = document.getElementById(spanMinuti);
    spanSekundi = document.getElementById(spanSekundi);
    var interval = setInterval(function () {
        spanDani.textContent = krajNoveGodine(datum).dana;
        spanSati.textContent = krajNoveGodine(datum).sati;
        spanMinuti.textContent = dodajNulu(krajNoveGodine(datum).minuta);
        spanSekundi.textContent = krajNoveGodine(datum).sekundi;
        if (krajNoveGodine(datum).preostalo <= 0) {
            console.log('tu sam!!!');
            clearInterval(interval);
            spanDani.textContent = '00';
            spanSati.textContent = '00';
            spanMinuti.textContent = '00';
            spanSekundi.textContent = '00';
            trenutnaGodina++;
            var vrednosZaInterval = 60;
            var lapmpice = setInterval(function () {
                vrednosZaInterval--;
                spanDani.style.color = '#' + Math.random().toString(16).substr(2, 3);
                spanSati.style.color = '#' + Math.random().toString(16).substr(2, 3);
                spanMinuti.style.color = '#' + Math.random().toString(16).substr(2, 3);
                spanSekundi.style.color = '#' + Math.random().toString(16).substr(2, 3);
                if (vrednosZaInterval <= 0) {
                    clearInterval(lapmpice);
                    spanDani.style.color = '';
                    spanSati.style.color = '';
                    spanMinuti.style.color = '';
                    spanSekundi.style.color = '';
                }
            }, 1000)
            var noviDatum = 'December 31 ' + trenutnaGodina + ' 23:59:59 UTC+01:00';
            console.log('trenutna godina u inetvalu: ', trenutnaGodina);
            setTimeout(function () {
                sat('dani', 'sati', 'minuti', 'sekunde', noviDatum);
            }, 60000)
        }
    }, 1000)
}

function dodajNulu(broj) {
    return broj < 10 ? '0' + broj : broj;
}

function obicanSat(elSati, elSekunde) {
    elSati = document.getElementById(elSati);
    elSekunde = document.getElementById(elSekunde);

    var interval = setInterval(function () {
        var date = new Date();
        elSati.textContent = dodajNulu(date.getHours()) + ':'
            + dodajNulu(date.getMinutes())
        elSekunde.textContent = dodajNulu(date.getSeconds());

    }, 1000);
}
obicanSat('hours', 'seconds');
sat('dani', 'sati', 'minuti', 'sekunde', novaGodina);

document.getElementById('novogodisnji-dugme').addEventListener('click', function () {
    document.getElementById('novogodisnji').style.display = 'block';
    document.getElementById('digitalni').style.display = 'none';

});
document.getElementById('digitalni-dugme').addEventListener('click', function () {
    document.getElementById('novogodisnji').style.display = 'none';
    document.getElementById('digitalni').style.display = 'block';
});
document.getElementById('tema').addEventListener('change',function(){
    for(var i=0;i<this.options.length;i++){
        if(this.options[i].selected){
          document.getElementById('myVideo').setAttribute('src','assets/media/'+this.options[i].value);
        }
    }
})