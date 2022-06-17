import kk from "./index";

describe('Integer array 4,5,6,7,8, (LDM)', () => {

  var input = [4, 5, 6, 7, 8];
  var result = kk.LDM({ values: input });

  it('returns object', () => {
    expect(result).toMatchInlineSnapshot(`
Object {
  "A": Array [
    8,
    6,
  ],
  "ASum": 14,
  "B": Array [
    4,
    7,
    5,
  ],
  "BSum": 16,
  "distance": 2,
}
`);
  });

  it('A populated correctly', () => {
    expect(result.A).toContain(8);
    expect(result.A).toContain(6);
  });

  it('B populated correctly', () => {
    expect(result.B).toContain(4);
    expect(result.B).toContain(5);
    expect(result.B).toContain(7);
  });

  it('Sums are correct', () => {
    expect(result.ASum).toBe(14);
    expect(result.BSum).toBe(16);
  });

  it('Distance is correct', () => {
    expect(result.distance).toBe(2);
  });
});

describe('Integer array 4,5,6,7,8 (greedy)', () => {

  var input = [4, 5, 6, 7, 8];
  var result = kk.greedy({ values: input });

  it('returns object', () => {
    expect(result).toMatchInlineSnapshot(`
Object {
  "A": Array [
    7,
    6,
  ],
  "ASum": 13,
  "B": Array [
    8,
    5,
    4,
  ],
  "BSum": 17,
  "distance": 4,
}
`);
  });

  it('A populated correctly', () => {
    expect(result.A).toContain(7);
    expect(result.A).toContain(6);
  });

  it('B populated correctly', () => {
    expect(result.B).toContain(8);
    expect(result.B).toContain(5);
    expect(result.B).toContain(4);
  });

  it('Sums are correct', () => {
    expect(result.ASum).toBe(13);
    expect(result.BSum).toBe(17);
  });

  it('Distance is correct', () => {
    expect(result.distance).toBe(4);
  });
});

describe('Object array (LDM)', () => {

  var input = [
    { 'color': 'red', 'count': 3 }, { 'color': 'green', 'count': 13 }
  ];
  var result = kk.LDM({ values: input, key: 'count' });
  expect(result).toMatchInlineSnapshot(`
Object {
  "A": Array [
    Object {
      "color": "red",
      "count": 3,
    },
  ],
  "ASum": 3,
  "B": Array [
    Object {
      "color": "green",
      "count": 13,
    },
  ],
  "BSum": 13,
  "distance": 10,
}
`);


});

describe('Object array (greedy)', () => {
  var input = [
    { 'color': 'red', 'count': 3 }, { 'color': 'green', 'count': 13 }
  ];
  var result = kk.greedy({ values: input, key: 'count' });
  expect(result).toMatchInlineSnapshot(`
Object {
  "A": Array [
    Object {
      "color": "red",
      "count": 3,
    },
  ],
  "ASum": 3,
  "B": Array [
    Object {
      "color": "green",
      "count": 13,
    },
  ],
  "BSum": 13,
  "distance": 10,
}
`);
});
