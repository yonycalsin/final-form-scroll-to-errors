import { FormApi, getIn, Unsubscribe } from 'final-form';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';

type FormInput = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type FormErrors = Record<string, unknown>;

const noop = () => undefined;

function isFocusableInput(inputElement: FormInput) {
  return !!(inputElement && typeof inputElement.focus === 'function');
}

function getAllInputsWithName(): FormInput[] {
  if (typeof document === 'undefined') {
    return [];
  }

  return Array.from(
    document.querySelectorAll<FormInput>(
      'input[name], textarea[name], select[name]'
    )
  ).filter(isFocusableInput);
}

function getInput(allInputs: FormInput[], errors: FormErrors) {
  return allInputs.find((input) => input.name && getIn(errors, input.name));
}

function createScrollToErrorsDecorator() {
  return function (formApi: FormApi): Unsubscribe {
    const focusOnFirstError = (errors: FormErrors) => {
      const allInputs = getAllInputsWithName();

      const firstInput = getInput(allInputs, errors);

      if (firstInput) {
        scrollIntoViewIfNeeded(firstInput, {
          behavior: 'smooth',
          scrollMode: 'if-needed',
        });

        if (!(firstInput as HTMLInputElement).readOnly) {
          firstInput.focus();
        }
      }
    };

    // Save original submit function
    const originalSubmit = formApi.submit;

    // Subscribe to errors, and keep a local copy of them
    let state: { errors?: FormErrors; submitErrors?: FormErrors } = {};

    const unsubscribe = formApi.subscribe(
      (nextState) => {
        state = nextState;
      },
      { errors: true, submitErrors: true }
    );

    // What to do after submit
    const afterSubmit = () => {
      const { errors, submitErrors } = state;

      if (errors && Object.keys(errors).length) {
        focusOnFirstError(errors);
      } else if (submitErrors && Object.keys(submitErrors).length) {
        focusOnFirstError(submitErrors);
      }
    };

    // Rewrite submit function
    formApi.submit = () => {
      const result = originalSubmit.call(formApi);

      if (result && typeof result.then === 'function') {
        // async
        result.then(afterSubmit, noop);
      } else {
        // sync
        afterSubmit();
      }

      return result;
    };

    return () => {
      unsubscribe();

      formApi.submit = originalSubmit;
    };
  };
}

export default createScrollToErrorsDecorator;
