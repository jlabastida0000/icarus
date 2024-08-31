.PHONY: build start test

build:
  wasm-pack build --target web
  cd www && npm run build

start:
  cd www && npm start

test:
  cargo test
  cd www && npm test