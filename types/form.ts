// Form-related types
export type FieldStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  status: FieldStatus;
}

export interface FormState<T extends Record<string, unknown>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

export interface FormActions<T extends Record<string, unknown>> {
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: <K extends keyof T>(field: K, error: string) => void;
  setTouched: <K extends keyof T>(field: K, touched?: boolean) => void;
  validate: () => Promise<boolean>;
  reset: () => void;
  submit: () => Promise<void>;
}

export type ValidationRule<T> = (value: T) => string | undefined | Promise<string | undefined>;

export interface FieldConfig<T> {
  initialValue: T;
  rules?: ValidationRule<T>[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}
