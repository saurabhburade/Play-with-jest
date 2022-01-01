// toBe
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

// toEqual
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

// .not
test("Adding 1 + 1 does not equal 3", () => {
  expect(1 + 1).not.toBe(3);
});

// toBeNull、toBeDefined、toBeUndefined、toBeTruthy、toBeFalsy
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

// toBeGreaterThan、toBeGreaterThanOrEqual、toBeLessThan、toBeLessThanOrEqual
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// toBeCloseTo
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

// toMatch
test('there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

// toContain
test("the shopping list has beer on it", () => {
  const shoppingList = [
    "diapers",
    "kleenex",
    "trash bags",
    "paper towels",
    "beer",
  ];
  expect(shoppingList).toContain("beer");
});

// .toHaveProperty(keyPath, value)
test("this house has my desired features", () => {
  // Object containing house features to be tested
  const houseForSale = {
    bath: true,
    bedrooms: 4,
    kitchen: {
      amenities: ["oven", "stove", "washer"],
      area: 20,
      wallColor: "white",
      "nice.oven": true,
    },
    "ceiling.height": 2,
  };

  // Simple Referencing
  expect(houseForSale).toHaveProperty("bath");
  expect(houseForSale).toHaveProperty("bedrooms", 4);

  expect(houseForSale).not.toHaveProperty("pool");

  // Deep referencing using dot notation
  expect(houseForSale).toHaveProperty("kitchen.area", 20);
  expect(houseForSale).toHaveProperty("kitchen.amenities", [
    "oven",
    "stove",
    "washer",
  ]);

  expect(houseForSale).not.toHaveProperty("kitchen.open");

  // Deep referencing using an array containing the keyPath
  expect(houseForSale).toHaveProperty(["kitchen", "area"], 20);
  expect(houseForSale).toHaveProperty(
    ["kitchen", "amenities"],
    ["oven", "stove", "washer"]
  );
  expect(houseForSale).toHaveProperty(["kitchen", "amenities", 0], "oven");
  expect(houseForSale).toHaveProperty(["kitchen", "nice.oven"]);
  expect(houseForSale).not.toHaveProperty(["kitchen", "open"]);

  // Referencing keys with dot in the key itself
  expect(houseForSale).toHaveProperty(["ceiling.height"], 2);
});

// toThrow
test("compiling android goes as expected", () => {
  function compileAndroidCode() {
    throw new Error("you are using the wrong JDK");
  }

  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow("you are using the wrong JDK");
  expect(compileAndroidCode).toThrow(/JDK/);
});

// toBeInstanceOf
test("new A() is an instance of A", () => {
  class A {}

  expect(new A()).toBeInstanceOf(A);
  expect(() => {}).toBeInstanceOf(Function);
});

// .resolves
test("resolves to lemon", () => {
  // make sure to add a return statement
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});

// .rejects
test("rejects to octopus", () => {
  // make sure to add a return statement
  return expect(Promise.reject(new Error("octopus"))).rejects.toThrow(
    "octopus"
  );
});

// SUMMERY OF MATCHERS

test("BASIC MATCHERS", () => {
  expect(42).toBe(42); // Strict equality (===)
  expect(42).not.toBe(3); // Strict equality (!==)
  expect([1, 2]).toEqual([1, 2]); // Deep equality
  expect({ a: undefined, b: 2 }).toEqual({ b: 2 }); // Deep equality
  expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 }); // Strict equality (Jest 23+)
});

test("FALSY MATCHERS", () => {
  // Matches anything that an if statement treats as true (not false, 0, '', null, undefined, NaN)
  expect("foo").toBeTruthy();
  // Matches anything that an if statement treats as false (false, 0, '', null, undefined, NaN)
  expect("").toBeFalsy();
  // Matches only null
  expect(null).toBeNull();
  // Matches only undefined
  expect(undefined).toBeUndefined();
  // The opposite of toBeUndefined
  expect(7).toBeDefined();
  // Matches true or false
  expect(true).toEqual(expect.any(Boolean));
});

test("NUMBERS MATCHERS", () => {
  expect(2).toBeGreaterThan(1);
  expect(1).toBeGreaterThanOrEqual(1);
  expect(1).toBeLessThan(2);
  expect(1).toBeLessThanOrEqual(1);
  expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
  expect(NaN).toEqual(expect.any(Number));
});
test("STRINGS MATCHERS", () => {
  expect("long string").toMatch("str");
  expect("string").toEqual(expect.any(String));
  expect("coffee").toMatch(/ff/);
  expect("pizza").not.toMatch("coffee");
  expect(["pizza", "coffee"]).toEqual([
    expect.stringContaining("zz"),
    expect.stringMatching(/ff/),
  ]);
});
test("ARRAYS MATCHERS", () => {
  expect([]).toEqual(expect.any(Array));
  expect(["Alice", "Bob", "Eve"]).toHaveLength(3);
  expect(["Alice", "Bob", "Eve"]).toContain("Alice");
  expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 });
  expect(["Alice", "Bob", "Eve"]).toEqual(
    expect.arrayContaining(["Alice", "Bob"])
  );
});

test("OBJECTS MATCHERS", () => {
  expect({ a: 1 }).toHaveProperty("a");
  expect({ a: 1 }).toHaveProperty("a", 1);
  expect({ a: { b: 1 } }).toHaveProperty("a.b");
  expect({ a: 1, b: 2 }).toMatchObject({ a: 1 });
  expect({ a: 1, b: 2 }).toMatchObject({
    a: expect.any(Number),
    b: expect.any(Number),
  });
  expect([{ a: 1 }, { b: 2 }]).toEqual([
    expect.objectContaining({ a: expect.any(Number) }),
    expect.anything(),
  ]);
});

test("EXCEPTIONS MATCHERS", () => {
  const fn = () => {
    throw new Error("Out of cheese!");
  };
  expect(fn).toThrow();
  expect(fn).toThrow("Out of cheese");
  expect(fn).toThrowErrorMatchingSnapshot();
});

// test("SNAPSHOT MATCHERS", () => {
//   expect(node).toMatchSnapshot();
//   // Jest 23+
//   expect(user).toMatchSnapshot({
//     date: expect.any(Date),
//   });
//   expect(user).toMatchInlineSnapshot();
// });

// test("MOCK FN MATCHERS", () => {
//   // const fn = jest.fn()
// //   const fn = jest.fn().mockName('Unicorn') // named mock, Jest 22+
//   expect(fn).toBeCalled(); // Function was called
//   expect(fn).not.toBeCalled(); // Function was *not* called
//   expect(fn).toHaveBeenCalledTimes(1); // Function was called only once
//   expect(fn).toBeCalledWith(arg1, arg2); // Any of calls was with these arguments
//   expect(fn).toHaveBeenLastCalledWith(arg1, arg2); // Last call was with these arguments
//   expect(fn).toHaveBeenNthCalledWith(callNumber, args); // Nth call was with these arguments (Jest 23+)
//   expect(fn).toHaveReturnedTimes(2); // Function was returned without throwing an error (Jest 23+)
//   expect(fn).toHaveReturnedWith(value); // Function returned a value (Jest 23+)
//   expect(fn).toHaveLastReturnedWith(value); // Last function call returned a value (Jest 23+)
//   expect(fn).toHaveNthReturnedWith(value); // Nth function call returned a value (Jest 23+)
//   expect(fn.mock.calls).toEqual([
//     ["first", "call", "args"],
//     ["second", "call", "args"],
//   ]); // Multiple calls
//   expect(fn.mock.calls[0][0]).toBe(2); // fn.mock.calls[0][0] — the first argument of the first call
// });

test("MISC MATCHERS", () => {
  class A {}
  expect(new A()).toBeInstanceOf(A);
  expect(() => {}).toEqual(expect.any(Function));
  expect("pizza").toEqual(expect.anything());
});
