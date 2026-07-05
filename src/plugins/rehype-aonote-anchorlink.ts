import type { Element, Root } from 'hast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

function hasClass(node: Element, name: string): boolean {
  const cls = node.properties?.className;
  if (!cls) return false;
  const list = Array.isArray(cls) ? cls.map(String) : String(cls).split(/\s+/);
  return list.includes(name);
}

function hasToclink(node: Element): boolean {
  return node.children.some(
    (child) =>
      child.type === 'element' &&
      child.tagName === 'a' &&
      hasClass(child, 'toclink'),
  );
}

/** Match upstream Python-Markdown `toc.anchorlink`: heading text links to its id. */
export function rehypeAonoteAnchorlink() {

  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (!/^h[2-4]$/.test(node.tagName)) return;
      if (hasClass(node, 'sr-only')) return;

      const id = node.properties?.id;
      if (!id || hasToclink(node)) return;

      const idStr = String(id);
      const label = toString(node).trim() || idStr;

      const link: Element = {
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['toclink'],
          href: `#${idStr}`,
          ariaLabel: `Link to ${label}`,
        },
        children: [...node.children],
      };

      node.children = [link];
    });
  };
}
