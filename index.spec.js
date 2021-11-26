const WorkTheThread = require("./index");

describe("WorkTheThread", () => {
  it("runs function", async () => {
    function testFn(x) {
      return Number(x) + Number(x);
    }

    const response = await WorkTheThread(testFn, 2);

    expect(response).toBe(4);
  });

  it("runs function", async () => {
    function testFn(x, y) {
      console.log(x, y);
      return Number(x) + Number(y);
    }

    const response = await WorkTheThread(testFn, 2, 4);

    expect(response).toBe(6);
  });
});
