import { formatDateTime, toLocalDate } from "@/lib/utils";

describe("utils_tests", () => {
  it("returns LocalDate", () => {
    const result = toLocalDate("2025-07-24T13:15:00");
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(6); // Months are 0-indexed in JavaScript
    expect(result.getDate()).toBe(24);
  });

  it("format date and time", () => {
    expect(formatDateTime(new Date("2025-07-24T13:15:00"), "14:00")).toEqual("2025-07-24T14:00");
  });
});
