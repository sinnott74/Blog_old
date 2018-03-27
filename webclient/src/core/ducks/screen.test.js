/**
 * @jest-environment jsdom
 */
import screenReducer, { largeScreen, smallScreen } from "core/ducks/screen";

describe("Screen Ducks - ", () => {
  describe("Reducer", () => {
    test("should return its inital state", () => {
      const initialState = screenReducer(undefined, {});
      const expectInitialState = { large: false };
      expect(initialState).toEqual(expectInitialState);
    });

    test("should handle SMALL_SCREEN", () => {
      const state = screenReducer(undefined, smallScreen());
      const expectedState = { large: false };
      expect(state).toEqual(expectedState);
    });

    test("should handle LARGE_SCREEN", () => {
      const state = screenReducer(undefined, largeScreen());
      const expectedState = { large: true };
      expect(state).toEqual(expectedState);
    });
  });
});
