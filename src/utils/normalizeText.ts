function normalizeText(str: string): string {
  return str
    .normalize("NFD") // decompose accents
    .replace(/[\u0300-\u036f]/g, "") // remove diacritical marks
    .toLowerCase();
}

export default normalizeText;
