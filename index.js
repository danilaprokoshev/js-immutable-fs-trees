import { mkfile, mkdir, isDirectory, isFile, getChildren, getMeta, getName} from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

const changeOwner = (node, newOwner) => {
  const name = getName(node);
  const newMeta = _.cloneDeep(getMeta(node));
  newMeta.owner = newOwner;
  if (isFile(node)) {
    return mkfile(name, newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map((child) => changeOwner(child, newOwner));
  const newTree = mkdir(name, newChildren, newMeta)
  return newTree;
};

const getNodesCount = (tree) => {
  if (isFile(tree)) {
    return 1;
  }
  const children = getChildren(tree);
  console.log(children);
  const descendantCounts = children.map((child) => getNodesCount(child));
  console.log(descendantCounts);
  console.log(1 + _.sum(descendantCounts));
  return 1 + _.sum(descendantCounts);
};

const tree = mkdir('/', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ], { owner: 'Jacob' }),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ], { owner: 'Jacob' }),
], { owner: 'Jacob' });

const newTree = changeOwner(tree, 'Vasya');

const a = getNodesCount(tree);

console.log(a);
console.log(tree);
