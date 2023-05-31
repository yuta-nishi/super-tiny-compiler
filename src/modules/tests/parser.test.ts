import { assertEquals } from '../../deps.ts';

import { NODE_TYPE, TOKEN } from '../../constants.ts';
import { parser } from '../parser.ts';

Deno.test('parser', () => {
  const tokens = [
    { type: TOKEN.PARENTHESES, value: '(' },
    { type: TOKEN.NAME, value: 'add' },
    { type: TOKEN.NUMBER, value: '2' },
    { type: TOKEN.PARENTHESES, value: '(' },
    { type: TOKEN.NAME, value: 'subtract' },
    { type: TOKEN.NUMBER, value: '4' },
    { type: TOKEN.NUMBER, value: '2' },
    { type: TOKEN.PARENTHESES, value: ')' },
    { type: TOKEN.PARENTHESES, value: ')' },
  ];

  assertEquals(parser(tokens), {
    type: NODE_TYPE.PROGRAM,
    body: [
      {
        type: NODE_TYPE.CALL_EXPRESSION,
        name: 'add',
        params: [
          {
            type: NODE_TYPE.NUMBER_LITERAL,
            value: '2',
          },
          {
            type: NODE_TYPE.CALL_EXPRESSION,
            name: 'subtract',
            params: [
              {
                type: NODE_TYPE.NUMBER_LITERAL,
                value: '4',
              },
              {
                type: NODE_TYPE.NUMBER_LITERAL,
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  });
});
