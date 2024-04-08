
const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botao = document.querySelectorAll (".app__card-button")
const startPauseBt = document.querySelector ('#start-pause')
const musicaFocoInput = document.querySelector("#alternar-musica")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const botaoPause = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector ("#timer")
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const somBeep = new Audio('/sons/beep.mp3')
musica.loop = true


let tempoDecorridoEmSegundos = 1500
let intervaloId =  null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play ()
    }else {
        musica.pause ()
    }
})

focoBt.addEventListener('mouseenter', () => {
    mostrarTempo()
    tempoDecorridoEmSegundos = 1500
    alterarContexto ('foco')
    focoBt.classList.add ('active')
    
})

curtoBt.addEventListener('mouseenter', () => {
    mostrarTempo()
    tempoDecorridoEmSegundos = 300
    alterarContexto ('descanso-curto')
    curtoBt.classList.add ('active')
})

longoBt.addEventListener('mouseenter', () => {
    mostrarTempo()
    tempoDecorridoEmSegundos = 900
    alterarContexto ('descanso-longo')
    longoBt.classList.add ('active')
})

function alterarContexto (contexto) {
    mostrarTempo()
    botao.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            
            break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada? <br> <strong class="app__title-strong">Faça uma pausa curta</strong>`

            break;
            case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície. <br> <strong class="app__title-strong">Faça uma pausa longa</strong>`
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somBeep.play ()
        zerar()
        alert ("temporizador finalizado!")
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


startPauseBt.addEventListener ('click', iniciarOuPausar )

function iniciarOuPausar () {
    if (intervaloId) {
        somPause.play ()
        zerar()
        return
    }
    somPlay.play ()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "pausar"
    botaoPause.setAttribute ('src', '/imagens/pause.png')
}

function zerar (){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "começar"
    botaoPause.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()





// const html = document.querySelector("html")
// const focobT = document.querySelector(".app__card-button--foco")
// const curtobT = document.querySelector(".app__card-button--curto")
// const longobT = document.querySelector(".app__card-button--longo")

// focobT.addEventListener ('click', () => {
//     html.setAttribute('data-contexto', 'foco')    
// })

// curtobT.addEventListener ('mouseenter', () => {
//     html.setAttribute('data-contexto', 'descanso-curto')    
// })
