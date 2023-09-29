import { Marked } from 'marked';
import markedBidi from '../../src/index.js';
import { isEqual, firstDiff } from '../../node_modules/marked-repo/test/helpers/html-differ.js';
import { strictEqual } from 'assert';

expect.extend({
  async toRender(spec, expected) {
    const marked = new Marked(markedBidi(spec.options));
    const result = {};
    const actual = marked.parse(spec.markdown, spec.options);
    result.pass = await isEqual(expected, actual);

    if (result.pass) {
      result.message = () => `${spec.markdown}\n------\n\nExpected: Should Fail`;
    } else {
      const diff = await firstDiff(actual, expected);
      result.message = () => `Expected: ${diff.expected}\n  Actual: ${diff.actual}`;
    }
    return result;
  },
  async toRenderExact(spec, expected) {
    const marked = new Marked(markedBidi(spec.options));
    const result = {};
    const actual = marked.parse(spec.markdown, spec.options);

    result.pass = strictEqual(expected, actual) === undefined;

    return result;
  }
});
