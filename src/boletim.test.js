import {
  calcularMedia,
  situacao,
  estaAprovado,
  maiorNota,
  quantidadeAcimaDe,
} from "./boletim.js";

describe("Boletim Escolar", () => {
  // ---------- calcularMedia ----------
  test("calcularMedia: [7, 8, 9] retorna 8", () => {
    // Arrange
    const notas = [7, 8, 9];

    // Act
    const resultado = calcularMedia(notas);

    // Assert
    expect(resultado).toBe(8);
  });

  test("calcularMedia: lista vazia retorna 0", () => {
    // Arrange
    const notas = [];

    // Act
    const resultado = calcularMedia(notas);

    // Assert
    expect(resultado).toBe(0);
  });

  // ---------- situacao ----------
  test("situacao: 6.5 retorna Recuperação", () => {
    // Arrange
    const media = 6.5;

    // Act
    const resultado = situacao(media);

    // Assert
    expect(resultado).toBe("Recuperação");
  });

  test("situacao: 7 (limite) retorna Aprovado", () => {
    // Arrange
    const media = 7;

    // Act
    const resultado = situacao(media);

    // Assert
    expect(resultado).toBe("Aprovado");
  });

  test("situacao: 5 (limite) retorna Recuperação", () => {
    // Arrange
    const media = 5;

    // Act
    const resultado = situacao(media);

    // Assert
    expect(resultado).toBe("Recuperação");
  });

  test("situacao: 4.9 retorna Reprovado", () => {
    // Arrange
    const media = 4.9;

    // Act
    const resultado = situacao(media);

    // Assert
    expect(resultado).toBe("Reprovado");
  });

  // ---------- estaAprovado ----------
  test("estaAprovado: 8 retorna true", () => {
    // Arrange
    const media = 8;

    // Act
    const resultado = estaAprovado(media);

    // Assert
    expect(resultado).toBe(true);
  });

  test("estaAprovado: 6.9 retorna false", () => {
    // Arrange
    const media = 6.9;

    // Act
    const resultado = estaAprovado(media);

    // Assert
    expect(resultado).toBe(false);
  });

  // ---------- maiorNota ----------
  test("maiorNota: [6, 9.5, 8] retorna 9.5", () => {
    // Arrange
    const notas = [6, 9.5, 8];

    // Act
    const resultado = maiorNota(notas);

    // Assert
    expect(resultado).toBe(9.5);
  });

  // ---------- quantidadeAcimaDe ----------
  test("quantidadeAcimaDe: [4, 7, 8.5] com corte 7 retorna 2", () => {
    // Arrange
    const notas = [4, 7, 8.5];
    const corte = 7;

    // Act
    const resultado = quantidadeAcimaDe(notas, corte);

    // Assert
    expect(resultado).toBe(2);
  });
});