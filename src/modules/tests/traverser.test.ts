import { assertSpyCall, assertSpyCalls, spy } from '../../deps.ts';

import { NODE_TYPE } from '../../constants.ts';
import { traverser } from '../traverser.ts';

Deno.test('traverser', () => {
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
            type: NODE_TYPE.STRING_LITERAL,
            value: 'hoge',
          },
        ],
      },
    ],
  };

  const programEnterFunc = spy((_val, _parent) => {});
  const programExitFunc = spy((_val, _parent) => {});
  const callExpressionEnterFunc = spy((_val, _parent) => {});
  const callExpressionExitFunc = spy((_val, _parent) => {});
  const numberLiteralEnterFunc = spy((_val, _parent) => {});
  const numberLiteralExitFunc = spy((_val, _parent) => {});
  const stringLiteralEnterFunc = spy((_val, _parent) => {});
  const stringLiteralExitFunc = spy((_val, _parent) => {});

  traverser(ast, {
    [NODE_TYPE.PROGRAM]: {
      enter(node, parent) {
        programEnterFunc(node, parent);
      },
      exit(node, parent) {
        programExitFunc(node, parent);
      },
    },
    [NODE_TYPE.CALL_EXPRESSION]: {
      enter(node, parent) {
        callExpressionEnterFunc(node, parent);
      },
      exit(node, parent) {
        callExpressionExitFunc(node, parent);
      },
    },
    [NODE_TYPE.NUMBER_LITERAL]: {
      enter(node, parent) {
        numberLiteralEnterFunc(node, parent);
      },
      exit(node, parent) {
        numberLiteralExitFunc(node, parent);
      },
    },
    [NODE_TYPE.STRING_LITERAL]: {
      enter(node, parent) {
        stringLiteralEnterFunc(node, parent);
      },
      exit(node, parent) {
        stringLiteralExitFunc(node, parent);
      },
    },
  });

  // program
  assertSpyCalls(programEnterFunc, 1);
  assertSpyCall(programEnterFunc, 0, {
    args: [ast, undefined],
  });

  assertSpyCalls(programExitFunc, 1);
  assertSpyCall(programExitFunc, 0, {
    args: [ast, undefined],
  });

  // callExpression
  assertSpyCalls(callExpressionEnterFunc, 1);
  assertSpyCall(callExpressionEnterFunc, 0, {
    args: [ast.body[0], ast],
  });
  assertSpyCalls(callExpressionExitFunc, 1);
  assertSpyCall(callExpressionExitFunc, 0, {
    args: [ast.body[0], ast],
  });

  // numberLiteral
  assertSpyCalls(numberLiteralEnterFunc, 1);
  assertSpyCall(numberLiteralEnterFunc, 0, {
    args: [ast.body[0].params[0], ast.body[0]],
  });
  assertSpyCalls(numberLiteralExitFunc, 1);
  assertSpyCall(numberLiteralExitFunc, 0, {
    args: [ast.body[0].params[0], ast.body[0]],
  });

  // stringLiteral
  assertSpyCalls(stringLiteralEnterFunc, 1);
  assertSpyCall(stringLiteralEnterFunc, 0, {
    args: [ast.body[0].params[1], ast.body[0]],
  });
  assertSpyCalls(stringLiteralExitFunc, 1);
  assertSpyCall(stringLiteralExitFunc, 0, {
    args: [ast.body[0].params[1], ast.body[0]],
  });
});
