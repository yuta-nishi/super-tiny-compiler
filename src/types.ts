import { NODE_TYPE, TOKEN } from './constants.ts';

export interface Token {
  type: (typeof TOKEN)[keyof typeof TOKEN];
  value: string;
}

export type Node = Program | CallExpression | NumberLiteral | StringLiteral;

export type NewNode =
  | NewProgram
  | NumberLiteral
  | StringLiteral
  | ExpressionStatement
  | CallExpressionWithCallee
  | Identifier;

export interface Program {
  type: typeof NODE_TYPE.PROGRAM;
  body: Array<Node>;
}

export interface NewProgram {
  type: typeof NODE_TYPE.PROGRAM;
  body: Array<NewNode>;
}

export interface CallExpression {
  type: typeof NODE_TYPE.CALL_EXPRESSION;
  name: string;
  params: Array<Node>;
}

export interface NumberLiteral {
  type: typeof NODE_TYPE.NUMBER_LITERAL;
  value: string;
}

export interface StringLiteral {
  type: typeof NODE_TYPE.STRING_LITERAL;
  value: string;
}

export type WithContext<T> = T & {
  __context: Array<NewNode>;
};

export interface ExpressionStatement {
  type: typeof NODE_TYPE.EXPRESSION_STATEMENT;
  expression: CallExpressionWithCallee;
}

export interface CallExpressionWithCallee {
  type: typeof NODE_TYPE.CALL_EXPRESSION;
  callee: Identifier;
  arguments: Array<NewNode>;
}

export interface Identifier {
  type: typeof NODE_TYPE.IDENTIFIER;
  name: string;
}

export interface Visitor {
  [NODE_TYPE.PROGRAM]?: {
    enter?: (node: Program, parent: Node) => void;
    exit?: (node: Program, parent: Node) => void;
  };
  [NODE_TYPE.CALL_EXPRESSION]?: {
    enter?: (node: CallExpression, parent: Node) => void;
    exit?: (node: CallExpression, parent: Node) => void;
  };
  [NODE_TYPE.NUMBER_LITERAL]?: {
    enter?: (node: NumberLiteral, parent: Node) => void;
    exit?: (node: NumberLiteral, parent: Node) => void;
  };
  [NODE_TYPE.STRING_LITERAL]?: {
    enter?: (node: StringLiteral, parent: Node) => void;
    exit?: (node: StringLiteral, parent: Node) => void;
  };
}
