const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor(data) {
    this.data = data;
    this.rootNode = null;
    this.left = null;
    this.right = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.insertNode(this.rootNode, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.searchNode(this.rootNode, data) !== null;
  }

  searchNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      return this.searchNode(node.left, data);
    } else if (data > node.data) {
      return this.searchNode(node.right, data);
    } else {
      return node;
    }
  }

  find(data) {
    return this.searchNode(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const minRight = this.findMinNode(node.right);
        node.data = minRight.data;
        node.right = this.removeNode(node.right, minRight.data);
      }
    }

    return node;
  }

  min() {
    const minNode = this.findMinNode(this.rootNode);
    return minNode ? minNode.data : null;
  }

  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  max() {
    const maxNode = this.findMaxNode(this.rootNode);
    return maxNode ? maxNode.data : null;
  }

  findMaxNode(node) {
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};