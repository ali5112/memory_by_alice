const carte = document.querySelectorAll ('.carta');
const modale = document.querySelector ('modal');
const GiocaDiNuovo = modale.querySelector ('.GiocaDiNuovo');


let cartaGirata= false;

let bloccaboard = false;

let primaCarta, secondaCarta;

function giraCarta() {
    if (bloccaboard) return;
    if (this === primaCarta) return;
    this.classList.add('flip');

    if(!cartaGirata){
        cartaGirata = true;
        primaCarta = this;
        return;
    }
    secondaCarta = this;
    

    controllaCorrispondenza();
}

function controllaCorrispondenza(){
    if (primaCarta.dataset.forma === secondaCarta.dataset.forma){
        disabilitaCarte();
        return;
    
    }
    rigiraCarte();

    //let corrisponde = primaCarta.dataset.forma === secondaCarta.dataset.forma;
    //corrisponde ? disabilitaCarte () : rigiraCarte;
}


function disabilitaCarte(){
    primaCarta.removeEventListener('click', giraCarta);
    secondaCarta.removeEventListener('click', giraCarta);

    resetboard();
    CarteTerminate();
}



function rigiraCarte() {
    bloccaboard = true;
    setTimeout(() => {
        primaCarta.classList.remove('flip');
       secondaCarta.classList.remove('flip');
      resetboard();

    }, 1000)
}

function resetboard(){
    [cartaGirata, bloccaboard] = [false, false];
    [primaCarta, secondaCarta] = [null, null];
}

function CarteTerminate(){
    const carteGirate = document.querySelectorAll('.flip').length;
    if (carteGirate === 12){
        const body = document.body;
        const party = new JSConfetti({body});
        party.addConfetti();
        modale.removeAttribute('hidden');
        body.classList.add("vittoria");
    }
}

(function mischia (){
    carte.forEach(carta => {
        const posizioneCasuale = Math.floor(Math.random()*12);
        carta.style.order= posizioneCasuale;
    })
})()

carte.forEach(carta => carta.addEventListener ('click', giraCarta));

GiocaDiNuovo.addEventListener('click', () => location.reload())