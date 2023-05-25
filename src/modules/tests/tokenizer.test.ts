import { assertEquals } from '../../deps.ts';

import { TOKEN } from '../../constants.ts';
import { tokenizer } from '../tokenizer.ts';

Deno.test('tokenizer', () => {
  const input = `
  (add 2 (subtract 4 2))
  (fullName "hoge" "fuga")
  `;

  assertEquals(tokenizer(input), [
    { type: TOKEN.PARENTHESES, value: '(' },
    { type: TOKEN.NAME, value: 'add' },
    { type: TOKEN.NUMBER, value: '2' },
    { type: TOKEN.PARENTHESES, value: '(' },
    { type: TOKEN.NAME, value: 'subtract' },
    { type: TOKEN.NUMBER, value: '4' },
    { type: TOKEN.NUMBER, value: '2' },
    { type: TOKEN.PARENTHESES, value: ')' },
    { type: TOKEN.PARENTHESES, value: ')' },
    { type: TOKEN.PARENTHESES, value: '(' },
    { type: TOKEN.NAME, value: 'fullName' },
    { type: TOKEN.STRING, value: 'hoge' },
    { type: TOKEN.STRING, value: 'fuga' },
    { type: TOKEN.PARENTHESES, value: ')' },
  ]);
});
