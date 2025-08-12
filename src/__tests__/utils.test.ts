import { formatDateTime, toLocalDate } from "@/lib/utils";

describe("utils_tests", () => {
  it("returns LocalDate", () => {
    expect(toLocalDate("2025-07-24T13:15:00")).toEqual(new Date("2025-07-23T14:00:00.000Z"));
  });

  it("format date and time", () => {
    expect(formatDateTime(new Date("2025-07-24T13:15:00"), "14:00")).toEqual("2025-07-24T14:00");
  });
});
