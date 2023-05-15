import { TOKEN } from '../constants.ts';
import { Token } from '../types.ts';

export const tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  const getChar = (): string => input[current];
  const consumeChar = (): string => input[current++];

  while (current < input.length) {
    // Consume white space
    const WHITESPACE = /(\s)/;
    if (WHITESPACE.test(getChar())) {
      consumeChar();
      continue;
    }

    // Consume parenthesis
    if (getChar() === '(' || getChar() === ')') {
      tokens.push({
        type: TOKEN.PARENTHESES,
        value: getChar(),
      });
      consumeChar();
      continue;
    }

    // Consume number
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(getChar())) {
      let value = '';
      while (NUMBERS.test(getChar())) {
        value += consumeChar();
      }

      tokens.push({
        type: TOKEN.NUMBER,
        value,
      });
      continue;
    }

    // Consume string
    const QUOTES = /["']/;
    if (QUOTES.test(getChar())) {
      const quote = consumeChar();
      let value = '';
      while (quote !== getChar()) {
        value += consumeChar();
      }

      consumeChar();
      tokens.push({
        type: TOKEN.STRING,
        value,
      });
      continue;
    }

    // Consume letters
    const LETTERS = /[a-z_-]/i;
    if (LETTERS.test(getChar())) {
      let value = '';
      while (LETTERS.test(getChar())) {
        value += consumeChar();
      }

      tokens.push({
        type: TOKEN.NAME,
        value,
      });
      continue;
    }

    throw new TypeError("I don't know what this character is: " + getChar());
  }

  return tokens;
};
