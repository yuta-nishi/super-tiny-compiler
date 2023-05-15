import { assertEquals } from '../../deps.ts';
import { tokenizer } from '../tokenizer.ts';

Deno.test('tokenizer', () => {
  const input = `
  (add 2 (subtract 4 2))
  (fullName "hoge" "fuga")
  `;

  assertEquals(tokenizer(input), [
    { type: 'parentheses', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'parentheses', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'parentheses', value: ')' },
    { type: 'parentheses', value: ')' },
    { type: 'parentheses', value: '(' },
    { type: 'name', value: 'fullName' },
    { type: 'string', value: 'hoge' },
    { type: 'string', value: 'fuga' },
    { type: 'parentheses', value: ')' },
  ]);
});
