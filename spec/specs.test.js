import { resolve } from 'path';
import { loadFiles } from '../node_modules/marked-repo/test/helpers/load.js';
import './helpers/matchers.js';

function runSpecs(title, dir, showCompletionTable, options) {
  options = options || {};
  const specs = loadFiles(resolve(__dirname, '../node_modules/marked-repo/test/specs', dir));

  describe(title, () => {
    Object.keys(specs).forEach(section => {
      describe(section, () => {
        specs[section].specs.forEach((spec) => {
          spec.options = Object.assign({}, options, (spec.options || {}));
          const example = (spec.example ? ' example ' + spec.example : '');
          const passFail = (spec.shouldFail ? 'fail' : 'pass');

          if (typeof spec.options.silent === 'undefined') {
            spec.options.silent = true;
          }

          (spec.only ? fit : (spec.skip ? xit : it))('should ' + passFail + example, async() => {
            const before = process.hrtime();
            if (spec.shouldFail) {
              await expect(spec).not.toRender(spec.html);
            } else if (spec.options.renderExact) {
              await expect(spec).toRenderExact(spec.html);
            } else {
              await expect(spec).toRender(spec.html);
            }
            const elapsed = process.hrtime(before);
            if (elapsed[0] > 0) {
              const s = (elapsed[0] + elapsed[1] * 1e-9).toFixed(3);
              throw new Error(`took too long: ${s}s`);
            }
          });
        });
      });
    });
  });
}

runSpecs('GFM', './gfm', true, { gfm: true, pedantic: false });
runSpecs('CommonMark', './commonmark', true, { gfm: false, pedantic: false });
runSpecs('Original', './original', false, { gfm: false, pedantic: true });
runSpecs('New', './new');
runSpecs('ReDOS', './redos');
