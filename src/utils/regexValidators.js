const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Password conditions:
 * - Mínimo 8 caracteres.
 * - 1 número
 * - 1 minúscula
 * - 1 mayúscula
 * - 1 caracter especial --> !@#$%^&*()_+-={}[]:;"'<>,.?/\|~
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/\\|~])[A-Za-z\d!@#$%^&*()_+\-={}[\]:;"'<>,.?/\\|~]{8,}$/;

export { emailRegex, passwordRegex };
