import metadata from "../dist/metadata";
import BaseModel from "../dist/basemodel";

describe("Metadata", () => {
  it("can be added for a column", () => {
    class ExampleClass extends BaseModel {}

    const columnMetadata = {
      name: "test",
      dataType: "INT"
    };

    metadata.addColumn(ExampleClass, columnMetadata);

    const returnedMetadata = metadata.getEntityMetadata(ExampleClass);
    const returnColumnMetadata = returnedMetadata.columns["test"];
    expect(returnColumnMetadata).toBeTruthy();
    expect(returnColumnMetadata).toEqual(columnMetadata);
  });

  it("can be combined using superclasses", () => {
    // Create Grandparent & add column
    class GrandParent extends BaseModel {}
    const grandparentColumnMetadata = {
      name: "grandParentColumn",
      dataType: "INT"
    };
    metadata.addColumn(GrandParent, grandparentColumnMetadata);

    // Create Parent & add column
    class Parent extends GrandParent {}
    const parentColumnMetadata = {
      name: "parentColumn",
      dataType: "INT"
    };
    metadata.addColumn(Parent, parentColumnMetadata);

    // Create child subclass which should get parent metadata
    class Child extends Parent {}

    const returnedMetadata = metadata.getEntityMetadata(Child);

    const returnParentColumnMetadata = returnedMetadata.columns["parentcolumn"];
    expect(returnParentColumnMetadata).toBeTruthy();
    expect(returnParentColumnMetadata).toEqual(parentColumnMetadata);

    const returnGrandParentColumnMetadata =
      returnedMetadata.columns["grandparentcolumn"];
    expect(returnGrandParentColumnMetadata).toBeTruthy();
    expect(returnGrandParentColumnMetadata).toEqual(grandparentColumnMetadata);
  });
});

// ../node_modules/jest/bin/jest.js metadata.test.ts
