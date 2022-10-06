import { useCallback, useState } from "react";

interface Props<T> {
  initialState: T;
  validators?: FormValidator<T>;
  onFormSubmit: () => void;
  dependentValidators?: FormDependentValidator<T>;
}

export type FormValidator<T> = Partial<Record<keyof T, ValidatorFunction<T>>>;
export type ValidatorFunction<T> = (value: T[keyof T]) => string | undefined;

export type FormDependentValidator<T> = Partial<
  Record<keyof T, DependentValidatorFunction<T>>
>;
export type DependentValidatorFunction<T> = (
  formState: T
) => string | undefined;

type FormError<T> = Partial<Record<keyof T, string | undefined>>;

// TODO restrict T to string keyed object only to preserve chronological order of keys;
export const useForm = <T extends object>({
  initialState,
  validators,
  dependentValidators,
  onFormSubmit,
}: Props<T>) => {
  const [formState, setFormState] = useState<T>(initialState);
  const [formError, setFormError] = useState<FormError<T>>({});

  const formDidChange = useCallback((newForm: Partial<T>) => {
    setFormState((current) => {
      return {
        ...current,
        ...newForm,
      };
    });

    const newError = Object.keys(newForm).reduce(
      (prev, curr, _curInde, _arr) => {
        return { ...prev, [curr]: undefined };
      },
      {}
    );

    setFormError((current) => {
      return {
        ...current,
        ...newError,
      };
    });
  }, []);

  const setError = useCallback((formError: FormError<T>) => {
    setFormError((error) => {
      return {
        ...error,
        ...formError,
      };
    });
  }, []);

  const handleFormSubmit = useCallback(() => {
    if (!validators && !dependentValidators) {
      onFormSubmit();
      return;
    }

    let encounteredError = false;

    for (const [key, value] of Object.entries(formState)) {
      const validatorFN = validators && validators[key as keyof T];
      const dependentValidatorFN =
        dependentValidators && dependentValidators[key as keyof T];

      const valueError = validatorFN && validatorFN(value);
      const dependentValueError =
        dependentValidatorFN && dependentValidatorFN(formState);

      if (!valueError && !dependentValueError) continue;

      setError({ [key]: valueError || dependentValueError } as FormError<T>);

      encounteredError = true;
      break;
    }

    !encounteredError && onFormSubmit();
  }, [formState]);

  const clearForm = useCallback(() => {
    setFormState(initialState);
    setFormError({});
  }, []);

  return {
    formDidChange,
    formState,
    formError,
    setError,
    handleFormSubmit,
    clearForm,
  };
};
