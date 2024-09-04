import { validateExcel } from "../src/index";
import fs from "fs";
import path from "path";

test("validates a correct Excel file", async () => {
  const buffer = fs.readFileSync(path.join(__dirname, "correct.xlsx"));
  const columns = ["Name", "Email", "Address"];
  const result = await validateExcel(buffer, columns);

  expect(result.isValid).toBe(true);
  expect(result.errors.length).toBe(0);
});
