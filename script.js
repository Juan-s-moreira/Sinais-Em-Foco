document.addEventListener('DOMContentLoaded', function() {
    const letras = document.querySelectorAll('.letra');
    const imagemExibida = document.getElementById('img-exibida');
    
    letras.forEach(letra => {
        letra.addEventListener('click', function(){
            const letraData = letra.getAttribute('data-letra');
            const imagemSrc = `assets/img-${letraData}.png`;

            imagemExibida.innerHTML = `
            <img src="${imagemSrc}"alt="Letra ${letraData.toUpperCase()} em LIBRAS">
            `;
        })
    });
});

