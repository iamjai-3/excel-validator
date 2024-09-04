# Excel Validator

A simple and efficient utility for validating Excel files against expected column headers using TypeScript. This package leverages the `exceljs` library to parse and validate the structure of Excel files.

## Features

- Validates Excel files based on expected column headers.
- Provides detailed error messages for header mismatches or missing worksheets.
- Written in TypeScript for strong type safety and easy integration.

## Installation

To install the package, use npm:

```bash
npm install excel-validator
```

## API

### `validateExcel(buffer: Buffer, expectedHeaders: string[]): Promise<ValidationResult>`

#### Parameters:

- `buffer` (Buffer): The buffer of the Excel file to be validated.
- `expectedHeaders` (string[]): An array of expected column headers in the first row of the Excel sheet.

#### Returns:

- A promise that resolves to an object of type `ValidationResult`.

### `ValidationResult`

- `isValid` (boolean): Indicates whether the Excel file is valid.
- `errors` (ValidationError[]): An array of validation errors, if any.

### `ValidationError`

- `type` (string): The type of the error (e.g., "Validation", "Error").
- `message` (string): A descriptive message about the error.

## Example Validation Result

```json
{
  "isValid": false,
  "errors": [
    {
      "type": "Validation",
      "message": "Expected 3 columns but found 2."
    },
    {
      "type": "Validation",
      "message": "Column headers mismatch. Expected headers: Header1,Header2,Header3. Actual headers: Header1,Header4."
    }
  ]
}
```
