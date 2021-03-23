let conteudoCartas = document.querySelector('#conteudo');

let imagens = [
  'arvore.svg',
  'flor.svg',
  'sertão.svg',
  'natureza.svg',
  'planeta_terra.svg',
  'planta.svg',
];

let cartasHTML = '';

imagens.forEach(imagem => {
  cartasHTML += `<div class="cartas-memoria" data-cartas="${imagem}">
    <img class="parte-frente" src="assets/img/${imagem}"/>
    <img class="parte-tras" src="assets/img/capa.svg">
  </div>`;
});

conteudoCartas.innerHTML = cartasHTML + cartasHTML;

let cartas = document.querySelectorAll('.cartas-memoria');
let primeiraCarta = '';
let segundaCarta = '';
let travarGiro = false;

function girarCarta() {
  if (travarGiro) {
    return false;
  }
  this.classList.add('girar');

  if (!primeiraCarta) {
    primeiraCarta = this;
    return false;
  }

  segundaCarta = this;

  checarCombinacao();
}

function checarCombinacao() {
  let combina = primeiraCarta.dataset.cartas === segundaCarta.dataset.cartas;
  if (combina == false) {
    virarCartas();
  } else {
    resetarCartas(combina);
  }
  /*!combina ? virarCartas() : resetarCartas(combina);*/
}

function virarCartas() {
  travarGiro = true;
  setTimeout(() => {
    primeiraCarta.classList.remove('girar');
    segundaCarta.classList.remove('girar');

    resetarCartas();
  }, 1000);
}

function resetarCartas(combina) {
  if (combina) {
    primeiraCarta.removeEventListener('click', girarCarta);
    segundaCarta.removeEventListener('click', girarCarta);
  }
  primeiraCarta = null;
  segundaCarta = null;
  travarGiro = false;
}

cartas.forEach(carta => carta.addEventListener('click', girarCarta));
