document.addEventListener('DOMContentLoaded', function() {
    const letras = document.querySelectorAll('.letra');
    const imagemExibida = document.getElementById('img-exibida');
    const inputPalavra = document.getElementById('input-palavra');
    const mostrarImagens = document.getElementById('mostrar-img');
    const imagensPalavra = document.getElementById('img-palavra');
    
    letras.forEach(letra => {
        letra.addEventListener('click', function(){
            const letraData = letra.getAttribute('data-letra');
            const imagemSrc = `assets/img-${letraData}.png`;

            imagemExibida.innerHTML = `
            <img src="${imagemSrc}"alt="Letra ${letraData.toUpperCase()} em LIBRAS">
            `;
        })
    });

    mostrarImagens.addEventListener('click', function(){
        imagensPalavra.innerHTML = '';
    
        const palavra = inputPalavra.value.toLowerCase();
    
        for(let letra of palavra){
            if (letra === ' '){
                const espaco = document.createElement('span');
            } else {
                const imagemSrc = `assets/img-${letra}.png`;
                
                const img = document.createElement('img');
                
                img.src = imagemSrc;
                img.alt = `letra ${letra.toUpperCase()} em LIBRAS`;
                img.title = `letra ${letra.toUpperCase()} em LIBRAS`
                
                imagensPalavra.appendChild(img);
            }
        }
    });
});


