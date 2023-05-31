import { assertEquals } from '../../deps.ts';

import { NODE_TYPE } from '../../constants.ts';
import { codeGenerator } from '../code-generator.ts';

Deno.test('codeGenerator', () => {
  const newAst = {
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
  };

  const output = 'add(2, subtract(4, 2));';

  assertEquals(codeGenerator(newAst), output);
});
