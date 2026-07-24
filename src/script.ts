declare global {
    interface Window {
      vlibras?: {
        translate: (texto: string) => void;
        play: () => void;
      };
    }
  }
import { alfabetoLibras } from "./alfabeto.js";


function criarSinais(letra: string): HTMLImageElement | HTMLSpanElement {
    const sinalEncontrado = alfabetoLibras.find(
        item => item.letra.toLowerCase() === letra.toLowerCase()
    )

    if(sinalEncontrado) {
        const img = document.createElement('img')
        img.src = sinalEncontrado.caminhoImg
        img.alt = `letra ${letra.toUpperCase()} em LIBRAS`
        img.title = `letra ${letra.toUpperCase()} em LIBRAS`
        return img
    } else {
        const caracterInvalido = document.createElement('span')
        caracterInvalido.classList.add('caracter-erro')
        caracterInvalido.innerText = letra.toUpperCase()
        caracterInvalido.title = `o caracter "${letra}" não possui tradução nessa aplicação.`
        return caracterInvalido
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const letras = document.querySelectorAll('.letra') as NodeListOf<HTMLButtonElement>;
    const imagemExibida = document.getElementById('img-exibida') as HTMLDivElement;
    const inputPalavra = document.getElementById('input-palavra') as HTMLInputElement;
    const mostrarImagens = document.getElementById('mostrar-img') as HTMLButtonElement;
    const imagensPalavra = document.getElementById('img-palavra') as HTMLDivElement;
    
    letras.forEach(letra => {
        letra.addEventListener('click', function(){
            const letraData = letra.getAttribute('data-letra');

            if(!letraData || !imagemExibida) return;

         const imagemLetra = criarSinais(letraData)

         imagemExibida.innerHTML = ''
         imagemExibida.appendChild(imagemLetra)
        })
    });

  

    if(inputPalavra && mostrarImagens && imagensPalavra){
      const traduzirPalavra = () =>{
            imagensPalavra.innerHTML = '';

        const palavra = inputPalavra.value;

        if(!palavra.trim()) return;


        for(let letra of palavra.toLocaleLowerCase()){
            if (letra === ' '){
                const espaco = document.createElement('span');
                espaco.style.display = 'inline-block'
                espaco.style.width = '20px'
                imagensPalavra.appendChild(espaco);
            } else {
                const imagemLetra = criarSinais(letra)
                imagensPalavra.appendChild(imagemLetra)
            }
    }

    let elementoTextoVLibras = document.getElementById('texto-vlibras-temp');
    if (!elementoTextoVLibras) {
        elementoTextoVLibras = document.createElement('div');
        elementoTextoVLibras.id = 'texto-vlibras-temp';
        elementoTextoVLibras.style.position = 'absolute';
        elementoTextoVLibras.style.left = '-9999px';
        document.body.appendChild(elementoTextoVLibras);
    }
    
    elementoTextoVLibras.innerText = palavra;

    
    const eventoClique = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    
    elementoTextoVLibras.dispatchEvent(eventoClique);
    // const widgetVLibras = (window as any).vlibras
    // const vlibrasWidget = (window as any).vlibras;

        // if (vlibrasWidget?.plugin && typeof vlibrasWidget.plugin.translate === 'function') {
        //     vlibrasWidget.plugin.translate(palavra);
        // }

    // if(widgetVLibras){
    //     if(typeof widgetVLibras.translate === 'function'){
    //         widgetVLibras.translate(palavra)
    //     } else if (typeof widgetVLibras.player?.translate === 'function') {
    //         widgetVLibras.player.translate(palavra)
    //     } else if (typeof (window as any).VLibras?.translate === 'function') {
    //         (window as any).VLibras.translate(palavra)
    //     }
    // }
        
    
        
        
        
    

}
mostrarImagens.addEventListener('click', traduzirPalavra)

    inputPalavra.addEventListener('keypress', (event: KeyboardEvent) => {
        if(event.key === 'Enter') {
          traduzirPalavra()
        }
    })

    inputPalavra.addEventListener('input', () => {
        if(inputPalavra.value.trim() === '') {
            imagensPalavra.innerHTML = ''
        }
    })
}
});
