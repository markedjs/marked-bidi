import { marked } from 'marked';
import markedBidi from '../src/index.js';

describe('this-extension', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('paragraph', () => {
    marked.use(markedBidi());
    expect(marked('راست left')).toBe('<p dir="auto">راست left</p>\n');
  });

  test('heading', () => {
    marked.use(markedBidi());
    expect(marked('# راست left')).toBe('<h1 dir="auto">راست left</h1>\n');
  });

  test('unordered list', () => {
    marked.use(markedBidi());
    expect(marked('- راست left')).toBe('<ul dir="auto">\n<li>راست left</li>\n</ul>\n');
  });

  test('ordered list', () => {
    marked.use(markedBidi());
    expect(marked('1. راست left')).toBe('<ol dir="auto">\n<li>راست left</li>\n</ol>\n');
  });
});
