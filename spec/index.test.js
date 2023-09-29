import { Marked } from 'marked';
import markedBidi from '../src/index.js';

describe('marked-bidi', () => {
  let marked;

  beforeEach(() => {
    marked = new Marked(markedBidi());
  });

  test('paragraph', () => {
    expect(marked.parse('راست left')).toBe('<p dir="auto">راست left</p>\n');
  });

  test('heading', () => {
    expect(marked.parse('# راست left')).toBe('<h1 dir="auto">راست left</h1>\n');
  });

  test('unordered list', () => {
    expect(marked.parse('- راست left')).toBe('<ul dir="auto">\n<li>راست left</li>\n</ul>\n');
  });

  test('ordered list', () => {
    expect(marked.parse('1. راست left')).toBe('<ol dir="auto">\n<li>راست left</li>\n</ol>\n');
  });
});
