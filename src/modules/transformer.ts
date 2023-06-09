import { NODE_TYPE } from '../constants.ts';
import { NewProgram } from '../types.ts';
import { traverser } from './traverser.ts';

export const transformer = (ast: any): NewProgram => {
  const newAst: NewProgram = {
    type: NODE_TYPE.PROGRAM,
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    [NODE_TYPE.NUMBER_LITERAL]: {
      enter(node: any, parent: any) {
        parent._context.push({
          type: NODE_TYPE.NUMBER_LITERAL,
          value: node.value,
        });
      },
    },
    [NODE_TYPE.STRING_LITERAL]: {
      enter(node: any, parent: any) {
        parent._context.push({
          type: NODE_TYPE.STRING_LITERAL,
          value: node.value,
        });
      },
    },
    [NODE_TYPE.CALL_EXPRESSION]: {
      enter(node: any, parent: any) {
        let expression: any = {
          type: NODE_TYPE.CALL_EXPRESSION,
          callee: {
            type: NODE_TYPE.IDENTIFIER,
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        if (parent.type !== NODE_TYPE.CALL_EXPRESSION) {
          expression = {
            type: NODE_TYPE.EXPRESSION_STATEMENT,
            expression: expression,
          };
        }

        parent._context.push(expression);
      },
    },
  });

  return newAst;
};
