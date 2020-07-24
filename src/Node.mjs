import graphQl from "consts:graphQl";
import { setupClient, query } from "svql";


export class Node {
  constructor(name, options) {
    Object.defineProperties(this, {
      name: { value: name }
    });

    this.update(options);
  }

  update(options) {
    if (options === undefined) {
      return;
    }

    Object.defineProperties(this, {
      version: { value: options.version },
      uptime: { value: options.uptime },
      isLocal: { value: options.isLocal },
      memory: { value: options.memory },
      env: {
        value: options.env ? options.env.reduce((a, c) => {
          a[c.key] = c.value;
          return a;
        }, {}) : {}
      }
    });
  }

  toJSON() {
    return {
      name: this.name
    };
  }
}


const NODES = `
  {
    nodes {
      name
      version
      uptime
      memory {
        rss
        heapTotal
        heapUsed
        external
      }
      isLocal
    }
  }
`;

const _nodes = new Map();

function getNode(name, options) {
  if (name === "" || name === undefined) {
    return undefined;
  }

  let node = _nodes.get(name);

  if (node === undefined) {
    node = new myNode(name, options);
    _nodes.set(name, node);
  } else {
    node.update(options);
  }

  return node;
}

setupClient({
  url: graphQl
});

/*
export const nodes = readable([], async set => {
  const data = await query(NODES, {});
  set(data.nodes.map(node => getNode(node.name, node)));
  return () => {};
});

export const node = derived(
  [nodes, router.keys.node],
  ([$nodes, $node], set) => {
    set($nodes.find(a => a.name === $node));
    return () => {};
  }
);
*/