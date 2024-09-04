export type ValidationError = {
  type: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};
