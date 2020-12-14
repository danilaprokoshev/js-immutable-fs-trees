import {
    mkdir, mkfile, getName, isFile, isDirectory, getChildren,
} from '@hexlet/immutable-fs-trees';

const map = (fn, node) => {
    let result;
    result = fn(node);
    if (isDirectory(node)) {
      const children = getChildren(node);
        const newChildren = [];
        for (const child of children) {
          newChildren.push(map(fn, child));
        }
        result['children'] = newChildren;
    }

    return result;
};

const tree = mkdir('/', [
    mkdir('eTc', [
        mkdir('NgiNx'),
        mkdir('CONSUL', [
            mkfile('config.json'),
        ]),
    ]),
    mkfile('hOsts'),
]);
const tree2 = mkfile('smth');

const filter = (fn, node) => {
  let result = [];
    if (fn(node)) {
        result = { ...node };
        if (isDirectory(node)) {
          const children = getChildren(node);
          const newChildren = [];
          for (const child of children) {
            newChildren.push(filter(fn, child));
          }
          result['children'] = newChildren.flat();
        }
    }

    return result;
};

const reduce = (fn, node, startAcc = 0) => {
    let current = startAcc;
    current = fn(startAcc, node);
    console.log(node);
    if (isDirectory(node)) {
        const children = getChildren(node);
        for (const child of children) {
            current = reduce(fn, child, current);
            console.log(current);
        }
    }

    return current;
};

const counterNodes = (acc) => acc + 1;
console.log(reduce(counterNodes, tree, 0));
