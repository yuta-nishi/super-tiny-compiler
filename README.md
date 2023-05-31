# super-tiny-compiler

Original: [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/tree/master)

Source: [the-super-tiny-compiler-deno](https://github.com/kawamataryo/the-super-tiny-compiler-deno)


Compile (transpile) from one function call to another as follows.
```
(add 2 (subtract 4 2))
```
↓
```
add(2, subtract(2, 4));
```

This is accomplished in this order.
1. Tokenize
2. Parse
3. Transform
4. Generate
