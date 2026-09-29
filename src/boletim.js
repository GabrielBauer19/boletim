export function calcularMedia(notas) {
  if (notas.length == 0) {
    console.log("calcularMedia: lista vazia, retornando 0");
    return 0;
  }

  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma = soma + notas[i];
  }

  let media = soma / notas.length;
  console.log("calcularMedia:", notas, "->", media);
  return media;
}

export function situacao(media) {
  let resultado;

  if (media >= 7) {
    resultado = "Aprovado";
  } else if (media >= 5) {
    resultado = "Recuperação";
  } else {
    resultado = "Reprovado";
  }

  console.log("situacao:", media, "->", resultado);
  return resultado;
}

export function estaAprovado(media) {
  let resultado;

  if (media >= 7) {
    resultado = true;
  } else {
    resultado = false;
  }

  console.log("estaAprovado:", media, "->", resultado);
  return resultado;
}

export function maiorNota(notas) {
  let maior = notas[0];

  for (let i = 1; i < notas.length; i++) {
    if (notas[i] > maior) {
      maior = notas[i];
    }
  }

  console.log("maiorNota:", notas, "->", maior);
  return maior;
}

export function quantidadeAcimaDe(notas, corte) {
  let contador = 0;

  for (let i = 0; i < notas.length; i++) {
    if (notas[i] >= corte) {
      contador = contador + 1;
    }
  }

  console.log("quantidadeAcimaDe:", notas, "corte", corte, "->", contador);
  return contador;
}