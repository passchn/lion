import '@lion/ui/define/lion-combobox.js';
import '@lion/ui/define/lion-option.js';
import { expect, fixture, html } from '@open-wc/testing';

import { IsMatchingAnOption } from '@lion/ui/combobox.js';

/**
 * @typedef {import('@lion/ui/combobox.js').LionCombobox} LionCombobox
 */

describe('IsMatchingAnOption validation', () => {
  it('is enabled when an invalid value is set', async () => {
    let isEnabled;
    const el = /** @type {LionCombobox} */ (
      await fixture(html`
        <lion-combobox name="foo">
          <lion-option .choiceValue="${'Artichoke'}">Artichoke</lion-option>
          <lion-option .choiceValue="${'Chard'}">Chard</lion-option>
          <lion-option .choiceValue="${'Chicory'}">Chicory</lion-option>
          <lion-option .choiceValue="${'Victoria Plum'}">Victoria Plum</lion-option>
        </lion-combobox>
      `)
    );
    el.requireOptionMatch = false;
    const config = {};
    config.node = el;
    const validator = new IsMatchingAnOption();

    el.modelValue = 'Artichoke';
    await el.updateComplete;

    isEnabled = validator.execute('Artichoke', undefined, config);
    expect(isEnabled).to.be.false;

    el.modelValue = 'Foo';
    await el.updateComplete;

    isEnabled = validator.execute('Foo', undefined, config);
    expect(isEnabled).to.be.true;
  });

  it('is not enabled when empty is set', async () => {
    const el = /** @type {LionCombobox} */ (
      await fixture(html`
        <lion-combobox name="foo">
          <lion-option .choiceValue="${'Artichoke'}">Artichoke</lion-option>
          <lion-option .choiceValue="${'Chard'}">Chard</lion-option>
          <lion-option .choiceValue="${'Chicory'}">Chicory</lion-option>
          <lion-option .choiceValue="${'Victoria Plum'}">Victoria Plum</lion-option>
        </lion-combobox>
      `)
    );
    el.requireOptionMatch = false;
    const config = {};
    config.node = el;
    const validator = new IsMatchingAnOption();

    el.modelValue = '';
    await el.updateComplete;

    const isEnabled = validator.execute('', undefined, config);
    expect(isEnabled).to.be.false;
  });
});
