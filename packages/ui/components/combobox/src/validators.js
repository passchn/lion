/* eslint-disable max-classes-per-file */
import { Validator } from '@lion/ui/form-core.js';

export class IsMatchingAnOption extends Validator {
  static get validatorName() {
    return 'IsMatchingAnOption';
  }

  /**
   * @param {unknown} [value]
   * @param {string | undefined} [options]
   * @param {{ node: any }} [config]
   */
  // eslint-disable-next-line class-methods-use-this
  execute(value, options, config) {
    const hasNoMatchingOptions = config?.node.checkedIndex === -1;
    const isEmpty = config?.node.__isEmpty(value);
    return hasNoMatchingOptions && !isEmpty;
  }
}
