export const TOKEN = {
  NUMBER: 'number',
  STRING: 'string',
  NAME: 'name',
  PARENTHESES: 'parentheses',
} as const;

export const NODE_TYPE = {
  NUMBER_LITERAL: 'NumberLiteral',
  STRING_LITERAL: 'StringLiteral',
  CALL_EXPRESSION: 'CallExpression',
  PROGRAM: 'Program',
  EXPRESSION_STATEMENT: 'ExpressionStatement',
  IDENTIFIER: 'Identifier',
} as const;
