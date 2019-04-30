#!/bin/sh
PATH=../node_modules/.bin:$PATH
export PATH

cd contracts
chmod +x ../../node_modules/.bin/solcjs
../../node_modules/.bin/solcjs *.sol --abi --bin --overwrite -o ../bin/
cd ..

