export const esPalindromo = (frase: string) => {
    const fraseLimpia = frase
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
    const fraseInvertida = fraseLimpia.split("").reverse().join("");
    return fraseLimpia === fraseInvertida;
}