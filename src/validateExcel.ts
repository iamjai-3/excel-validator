import * as Excel from "exceljs";
import { ValidationError, ValidationResult } from "./types";

export async function validateExcel(
  buffer: Buffer,
  expectedHeaders: string[]
): Promise<ValidationResult> {
  const workbook = new Excel.Workbook();
  const errors: ValidationError[] = [];

  let isValid = true;

  try {
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      errors.push({
        type: "Validation",
        message: "Worksheet not found in the Excel file.",
      });
      return { isValid: false, errors };
    }

    const actualHeaders = (worksheet.getRow(1).values as string[]).filter(
      (header) => header
    );

    const expectedColumnCount = expectedHeaders.length;
    const actualColumnCount = actualHeaders.length;

    if (expectedColumnCount !== actualColumnCount) {
      isValid = false;
      errors.push({
        type: "Validation",
        message: `Expected ${expectedColumnCount} columns but found ${actualColumnCount}.`,
      });
    }

    const headerMismatch = expectedHeaders.filter(
      (header, index) => header !== actualHeaders[index]
    );

    if (headerMismatch.length > 0) {
      isValid = false;
      errors.push({
        type: "Validation",
        message: `Column headers mismatch. Expected headers: ${expectedHeaders.join(
          ","
        )}. Actual headers: ${actualHeaders.join(",")}.`,
      });
    }

    return { isValid, errors };
  } catch (error: any) {
    errors.push({
      type: "Error",
      message: `An error occurred while processing the Excel file: ${error.message}`,
    });
    return { isValid: false, errors };
  }
}
