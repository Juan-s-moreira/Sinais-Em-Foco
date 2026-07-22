import { alfabetoLibras } from "./alfabeto.js";
document.addEventListener('DOMContentLoaded', function () {
    const letras = document.querySelectorAll('.letra');
    const imagemExibida = document.getElementById('img-exibida');
    const inputPalavra = document.getElementById('input-palavra');
    const mostrarImagens = document.getElementById('mostrar-img');
    const imagensPalavra = document.getElementById('img-palavra');
    letras.forEach(letra => {
        letra.addEventListener('click', function () {
            const letraData = letra.getAttribute('data-letra');
            if (!letraData)
                return;
            const sinalEncontrado = alfabetoLibras.find(item => item.letra.toLowerCase() === letraData.toLowerCase());
            const imagemSrc = sinalEncontrado ? sinalEncontrado.caminhoImg : `assets/img-${letraData}.png`;
            const descricaoAl = sinalEncontrado ? sinalEncontrado.descricaoAl : `Letra ${letraData.toUpperCase()} em LIBRAS`;
            if (imagemExibida) {
                imagemExibida.innerHTML = `
                <img src="${imagemSrc}" alt=" ${descricaoAl}">
                `;
            }
        });
    });
    if (inputPalavra && mostrarImagens && imagensPalavra) {
        mostrarImagens.addEventListener('click', function () {
            imagensPalavra.innerHTML = '';
            const palavra = inputPalavra.value.toLowerCase();
            for (let letra of palavra) {
                if (letra === ' ') {
                    const espaco = document.createElement('span');
                    espaco.style.display = 'inline-block';
                    espaco.style.width = '20px';
                    imagensPalavra.appendChild(espaco);
                }
                else {
                    const sinalEncontrado = alfabetoLibras.find(item => item.letra.toLowerCase() === letra);
                    if (sinalEncontrado) {
                        const img = document.createElement('img');
                        img.src = sinalEncontrado ? sinalEncontrado.caminhoImg : `assets/img-${letra}.png`;
                        img.alt = `letra ${letra.toUpperCase()} em LIBRAS`;
                        img.title = `letra ${letra.toUpperCase()} em LIBRAS`;
                        imagensPalavra.appendChild(img);
                    }
                    else {
                        const caracterInvalido = document.createElement('span');
                        caracterInvalido.classList.add('caracter-erro');
                        caracterInvalido.innerText = letra.toUpperCase();
                        caracterInvalido.title = `o caracter  "${letra}" não possui tradução nessa aplicação.`;
                        imagensPalavra.appendChild(caracterInvalido);
                    }
                }
            }
        });
    }
});
//# sourceMappingURL=script.js.map