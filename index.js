function atualizarContador() {
    const agora = new Date();
    const meiaNoite = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 0, 0, 0);
    
    const diferenca = meiaNoite - agora;

    const elementoContador = document.getElementById("contador");
    if (!elementoContador) return;

    if (diferenca <= 0) {
        elementoContador.innerText = "As ofertas exclusivas encerraram!";
        return;
    }

   
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

   
    const formatoHoras = String(horas).padStart(2, '0');
    const formatoMinutos = String(minutos).padStart(2, '0');
    const formatoSegundos = String(segundos).padStart(2, '0');

    elementoContador.innerText = `As ofertas exclusivas terminam em: ${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
}


setInterval(atualizarContador, 1000);
atualizarContador();