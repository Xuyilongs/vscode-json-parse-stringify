import * as assert from 'assert';

import { decodeJsonSelection, encodeJsonSelection } from '../selectionConverter';

assert.strictEqual(decodeJsonSelection('"{\\"item\\":1}"'), '{"item":1}');
assert.strictEqual(decodeJsonSelection("'{\"item\":1}'"), '{"item":1}');
assert.strictEqual(decodeJsonSelection('"hello"'), '"hello"');
assert.strictEqual(decodeJsonSelection('true'), 'true');
assert.throws(() => decodeJsonSelection('process.exit()'));

assert.strictEqual(encodeJsonSelection('{"item":1}'), '"{\\"item\\":1}"');
assert.strictEqual(encodeJsonSelection('hello'), '"\\"hello\\""');

console.log('Selection conversion checks passed.');
