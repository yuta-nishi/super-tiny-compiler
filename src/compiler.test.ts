import { assertEquals } from './deps.ts';

import { compiler } from './compiler.ts';

Deno.test('compiler', () => {
  const input = '(add 2 (subtract 4 2))';
  const output = 'add(2, subtract(4, 2));';

  assertEquals(compiler(input), output);
});
