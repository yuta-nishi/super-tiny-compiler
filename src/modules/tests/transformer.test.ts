import { assertEquals } from '../../deps.ts';

import { NODE_TYPE } from '../../constants.ts';
import { transformer } from '../transformer.ts';

Deno.test('transformer', () => {
  const ast = {
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
  };

  assertEquals(transformer(ast), {
    type: NODE_TYPE.PROGRAM,
    body: [
      {
        type: NODE_TYPE.EXPRESSION_STATEMENT,
        expression: {
          type: NODE_TYPE.CALL_EXPRESSION,
          callee: {
            type: NODE_TYPE.IDENTIFIER,
            name: 'add',
          },
          arguments: [
            {
              type: NODE_TYPE.NUMBER_LITERAL,
              value: '2',
            },
            {
              type: NODE_TYPE.CALL_EXPRESSION,
              callee: {
                type: NODE_TYPE.IDENTIFIER,
                name: 'subtract',
              },
              arguments: [
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
      },
    ],
  });
});
