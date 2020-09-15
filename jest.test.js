test('test common matcher', () => {
    expect(2 + 2).toBe(4)
    expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeTruthy()
})

test('test number', () => {
    expect(4).toBeLessThan(3)
    expect(2).toBeLessThan(3)
})

test('test object', () => {
    expect({
        name: 'limuenui'
    }).toEqual({
        name: 'limuenui'
    })
})