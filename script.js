const perguntas = [
  "Você esteve no local do crime no dia da ocorrência?",
  "Conhecia a vítima antes do incidente?",
  "Teve algum desentendimento recente com a vítima?",
  "Manuseou o objeto encontrado na cena do crime?",
  "Foi visto perto do local por volta do horário do crime?",
  "Possui algum interesse financeiro na situação?",
  "Omitiu alguma informação no seu primeiro depoimento?",
  "Estava acompanhado de alguém que prefere não identificar?",
  "Teve acesso à chave/senha de entrada da cena do crime?",
  "Tem razões pessoais para querer que a vítima estivesse em apuros?"
];

let sim = 0;
let perguntaAtual = 0;

const painelTeste = document.getElementById("painel-teste");
const painelResultado = document.getElementById("painel-resultado");
const perguntaElemento = document.getElementById("pergunta");
const contadorPerguntas = document.getElementById("contador-perguntas");
const contadorRespostas = document.getElementById("contador-respostas");
const barraProgresso = document.getElementById("barra-progresso");
const tituloResultado = document.getElementById("titulo-resultado");
const totalSim = document.getElementById("total-sim");
const mensagemResultado = document.getElementById("mensagem-resultado");

function mostrarPergunta() {
  perguntaElemento.textContent = perguntas[perguntaAtual];

  contadorPerguntas.textContent =
    `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

  contadorRespostas.textContent = `${sim} respostas “Sim”`;

  barraProgresso.style.width =
    `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
}

function responder(resposta) {
  if (resposta === "S") {
    sim++;
  }

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    let classificacao;
    let mensagem;

    if (sim <= 4) {
      classificacao = "INOCENTE";
      mensagem = "Poucos indicadores positivos foram registrados.";
    } else if (sim === 5) {
      classificacao = "SUSPEITO";
      mensagem = "O resultado indica pontos que merecem atenção.";
    } else if (sim <= 8) {
      classificacao = "CÚMPLICE";
      mensagem = "Muitas respostas positivas foram registradas.";
    } else {
      classificacao = "CULPADO";
      mensagem = "Quase todas as respostas foram positivas.";
    }

    painelTeste.hidden = true;
    painelResultado.hidden = false;

    tituloResultado.textContent = classificacao;
    totalSim.textContent = sim;
    mensagemResultado.textContent = mensagem;
  }
}

document.getElementById("botao-sim").addEventListener("click", function () {
  responder("S");
});

document.getElementById("botao-nao").addEventListener("click", function () {
  responder("N");
});

document.getElementById("botao-reiniciar").addEventListener("click", function () {
  sim = 0;
  perguntaAtual = 0;

  painelResultado.hidden = true;
  painelTeste.hidden = false;

  mostrarPergunta();
});

mostrarPergunta();