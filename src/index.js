import { marked } from 'marked';

export default function() {
  return {
    useNewRenderer: true,
    renderer: {
      heading(...args) {
        const html = marked.Renderer.prototype.heading.call(this, ...args);
        return html.replace(/^<(h\d)/, '<$1 dir="auto"');
      },

      list(...args) {
        const html = marked.Renderer.prototype.list.call(this, ...args);
        return html.replace(/^<(ol|ul)/, '<$1 dir="auto"');
      },

      paragraph(...args) {
        const html = marked.Renderer.prototype.paragraph.call(this, ...args);
        return html.replace(/^<p/, '<p dir="auto"');
      }
    }
  };
}
