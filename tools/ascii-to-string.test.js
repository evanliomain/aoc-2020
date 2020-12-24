const ascii_to_string = require("./ascii-to-string")
// @ponicode
describe("ascii_to_string", () => {
    test("0", () => {
        let result = ascii_to_string([[10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"], [10, -45.9, 103.5, 0.955674]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000"])
    })

    test("1", () => {
        let result = ascii_to_string([])
        expect(result).toEqual([])
    })

    test("2", () => {
        let result = ascii_to_string([["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], [-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000"])
    })

    test("3", () => {
        let result = ascii_to_string([[-1, 0.5, 1, 2, 3, 4, 5], [-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"], [10, -45.9, 103.5, 0.955674], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000"])
    })

    test("4", () => {
        let result = ascii_to_string([["a", "b", "043", "holasenior"], [-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], ["a", "b", "043", "holasenior"], [-1, 0.5, 1, 2, 3, 4, 5], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000"])
    })

    test("5", () => {
        let result = ascii_to_string([["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], [-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000"])
    })

    test("6", () => {
        let result = ascii_to_string([["a", "b", "043", "holasenior"], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"], ["a", "b", "043", "holasenior"], [-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000"])
    })

    test("7", () => {
        let result = ascii_to_string([["a", "b", "043", "holasenior"], [-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], [-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "holasenior"], [10, -45.9, 103.5, 0.955674], ["a", "b", "043", "holasenior"], ["ponicodeIsAwesome", -0.353, "**Hamburger**", 4653], ["a", "b", "043", "holasenior"]])
        expect(result).toEqual(["\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000", "\u0000"])
    })
})
