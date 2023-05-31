import { codeGenerator } from './modules/code-generator.ts';
import { parser } from './modules/parser.ts';
import { tokenizer } from './modules/tokenizer.ts';
import { transformer } from './modules/transformer.ts';

export const compiler = (input: string): string => {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);

  return output;
};
