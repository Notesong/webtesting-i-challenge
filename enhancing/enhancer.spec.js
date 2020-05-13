const enhancer = require("./enhancer.js");

describe("enhancer item tests", () => {
  it("successful", () => {
    checkNumberValidity();

    // add 1 to enhancement if less than 20
    let succeeded = enhancer.succeed({
      name: "ice",
      durability: 100,
      enhancement: 10,
    });
    expect(succeeded.enhancement).toBe(11);

    // enhancement is unchanged if 20
    succeeded = enhancer.succeed({
      name: "ice",
      durability: 100,
      enhancement: 20,
    });
    expect(succeeded.enhancement).toBe(20);
  });

  it("fails", () => {
    checkNumberValidity();

    //subtract 5 durability and no loss to enhancement
    let failed = enhancer.fail({
      name: "ice",
      durability: 80,
      enhancement: 10,
    });
    expect(failed.durability).toBe(75);
    expect(failed.enhancement).toBe(10);

    // subtract 10 durability and -1 to enhancement
    // because less than 10 durability, durability becomes 0 automatically
    failed = enhancer.fail({
      name: "ice",
      durability: 9,
      enhancement: 20,
    });
    expect(failed.durability).toBe(0);
    expect(failed.enhancement).toBe(19);

    // subtract 10 durability and -1 to enhancement
    failed = enhancer.fail({
      name: "ice",
      durability: 80,
      enhancement: 20,
    });
    expect(failed.durability).toBe(70);
    expect(failed.enhancement).toBe(19);

    // subtract 5 durability and no loss to enhancement
    // because less than 5 durability, durability becomes 0 automatically
    failed = enhancer.fail({
      name: "ice",
      durability: 4,
      enhancement: 10,
    });
    expect(failed.durability).toBe(0);
    expect(failed.enhancement).toBe(10);

    // subtract 5 durability and no loss to enhancement
    // because less than 5 durability, durability becomes 0 automatically
    failed = enhancer.fail({
      name: "ice",
      durability: 60,
      enhancement: 10,
    });
    expect(failed.durability).toBe(55);
    expect(failed.enhancement).toBe(10);

    ////////////////////////////////
    // check for invalid numbers

    // invalid durability amounts
    failed = enhancer.fail({
      name: "ice",
      durability: -1,
      enhancement: 10,
    });
    expect(failed.durability).toBe(0);
    expect(failed.enhancement).toBe(10);

    failed = enhancer.fail({
      name: "ice",
      durability: 101,
      enhancement: 10,
    });
    expect(failed.durability).toBe(95);
    expect(failed.enhancement).toBe(10);

    // invalid enhancement amounts
    failed = enhancer.fail({
      name: "ice",
      durability: 10,
      enhancement: -1,
    });
    expect(failed.durability).toBe(5);
    expect(failed.enhancement).toBe(0);
  });

  it("repairs", () => {
    checkNumberValidity();

    // set durability to 100 no matter what durability currently is
    let repaired = enhancer.repair({
      name: "ice",
      durability: 80,
      enhancement: 15,
    });
    expect(repaired.durability).toBe(100);

    repaired = enhancer.repair({
      name: "ice",
      durability: 500,
      enhancement: 15,
    });
    expect(repaired.durability).toBe(100);
  });

  it("gets", () => {
    //expect(enhancer.get()).toBe(true);
  });
});

function checkNumberValidity() {
  let testObject = {
    name: "ice",
    durability: "60",
    enhancement: 21,
  };
  expect(() => enhancer.fail(testObject)).toThrow();

  testObject = {
    name: "ice",
    durability: 60,
    enhancement: "21",
  };
  expect(() => enhancer.fail(testObject)).toThrow();
}
