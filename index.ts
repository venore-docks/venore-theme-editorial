// Entrada do pacote: o Editorial nasceu no contrato 8.0.0 (não há Shell 7.x). O core lê
// "./theme"; este barrel só reexporta a definição e o manifesto para quem importar o pacote.
export { editorialTheme, default } from "./theme";
export { editorialManifest } from "./manifest";
