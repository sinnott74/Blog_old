import reducerRegistry from "./ReducerRegistry";

describe("ReducerRegistry", () => {
  test("is empty by default", () => {
    const reducers = reducerRegistry.getReducers();
    const expectedReducers = {};
    expect(reducers).toEqual(expectedReducers);
    expect(reducerRegistry._emitChange).toBeNull();
  });

  test("can register a reducer", () => {
    const name = "name";
    const reducer = {};
    reducerRegistry.register(name, reducer);
    const reducers = reducerRegistry.getReducers();
    const expectedReducers = { [name]: reducer };
    expect(reducers).toEqual(expectedReducers);
  });

  test("calls changeListener when a reducer is registered", done => {
    const name = "name";
    const reducer = {};
    const expectedReducers = { [name]: reducer };

    function changeListener(reducers) {
      expect(reducers).toEqual(expectedReducers);
      done();
    }
    reducerRegistry.setChangeListener(changeListener);
    reducerRegistry.register(name, reducer);
  });
});
