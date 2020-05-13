module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  validateNumbers(item);

  // add 1 to enhancement if less than 20
  if (item.enhancement < 20) {
    return { ...item, enhancement: item.enhancement + 1 };
    // enhancement is unchanged if 20
  } else {
    return { ...item };
  }
}

function fail(item) {
  validateNumbers(item);

  // check item numbers for validity
  if (item.durability < 0) {
    item = { ...item, durability: 0 };
  } else if (item.durability > 100) {
    item = { ...item, durability: 100 };
  }
  if (item.enhancement > 20) {
    item = { ...item, enhancement: 20 };
  } else if (item.enhancement < 0) {
    item = { ...item, enhancement: 0 };
  }

  if (item.enhancement < 15) {
    // if durability is less than 5, set durability to 0
    if (item.durability < 5) {
      return { ...item, durability: 0 };
      // if durability is 5 or greater, take 5 off of durability
    } else {
      return { ...item, durability: item.durability - 5 };
    }
  } else {
    // if enhancement is greater than 16, deduct a point from enhancement
    if (item.enhancement > 16) {
      // if durability is less than 10, set durability to 0
      if (item.durability < 10) {
        return {
          ...item,
          durability: 0,
          enhancement: item.enhancement - 1,
        };
        // if durability is 10 or greater, take 10 off of durability
      } else {
        return {
          ...item,
          durability: item.durability - 10,
          enhancement: item.enhancement - 1,
        };
      }
      // if enhancement is 16 or less, don't deduct a point from enhancement
    } else {
      // if durability is less than 10, set durability to 0
      if (item.durability < 10) {
        return {
          ...item,
          durability: 10,
        };
        // if durability is 10 or greater, take 10 off of durability
      } else {
        return {
          ...item,
          durability: item.durability - 10,
        };
      }
    }
  }
}

function repair(item) {
  validateNumbers(item);
  // set durability to 100 no matter what durability currently is
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}

function validateNumbers(item) {
  if (
    !Number.isInteger(item.durability) ||
    !Number.isInteger(item.enhancement)
  ) {
    throw new Error("Expected a number");
  }
}
