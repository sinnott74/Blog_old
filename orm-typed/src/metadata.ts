import { TableDefinition, ColumnDefinition, Table, define, Column } from "sql";
import BaseModel from "./basemodel";
import { Association } from "./associations";
import ModelManager from "./modelmanager";

export interface Metadata {
  [entityName: string]: ORMEntityDefinition;
}
export interface ORMColumnDefinition extends ColumnDefinition<string, object> {
  name: string;
}
export interface ORMEntityDefinition extends TableDefinition<string, any> {
  associations: ORMEntityAssociations;
}
export interface Tables {
  [entityName: string]: StarOverloadedSQLTable;
}

// Table.star() method should be able to take in a prefix option
export type StarOverloadedSQLTable = {
  star(obj?: { prefix: string }): Column<void, void>;
} & Table<string, any>;

export interface ORMEntityAssociations {
  [associationName: string]: Association;
}

/**
 * Responsible for managing Entity & Column data.
 *
 * Column decorators are called first & populates the Entity metadata stored here.
 * Entity descorators read its related column metadata & create the SQL entity object
 */
export class MetadataManager {
  private metadata: Metadata = {};
  private table: Tables = {};

  /**
   * Adds the metadata for a column
   * @param entityName
   * @param columnMetadata
   */
  addColumn(entity: typeof BaseModel, columnMetadata: ORMColumnDefinition) {
    const entityMetadata = this.getEntity(entity);
    entityMetadata.columns[columnMetadata.name.toLowerCase()] = columnMetadata;
  }

  /**
   * Adds the metadata for an association
   *
   * @param entity
   * @param associationOptions
   */
  addAssociation(association: Association) {
    const entityMetadata = this.getEntity(association.Source);
    entityMetadata.associations[association.name] = association;
  }

  /**
   * Creates an entity if it is not already defined
   * @param entityName
   */
  private getEntity(entity: typeof BaseModel) {
    const entityName = entity.name.toLowerCase();
    let entityMetadata = this.metadata[entityName];
    if (!entityMetadata) {
      entityMetadata = this.metadata[entityName] = {
        name: entityName,
        schema: "public",
        columns: {},
        associations: {}
      };
    }
    return entityMetadata;
  }

  /**
   * Get the metadata for an entity
   * @param entityName
   */
  getEntityMetadata(entity: typeof BaseModel) {
    const entityMetadata = this.getEntity(entity);

    let superEntity: any = Object.getPrototypeOf(entity);
    while (superEntity && superEntity.name) {
      const superEntityMetadata = this.metadata[superEntity.name.toLowerCase()];

      if (superEntityMetadata) {
        entityMetadata.columns = Object.assign(
          {},
          superEntityMetadata.columns,
          entityMetadata.columns
        );
      }
      superEntity = Object.getPrototypeOf(superEntity);
    }

    return entityMetadata;
  }

  getSQLEntity(entity: typeof BaseModel) {
    return this.table[entity.name.toLowerCase()];
  }

  build() {
    this.buildAssociations();
    this.buildSQLEntity();
  }

  private buildAssociations() {
    const models = ModelManager.getModels();
    const _self = this;
    models.forEach(model => {
      const entityMetadata = _self.getEntityMetadata(model);
      Object.values(entityMetadata.associations).forEach(association => {
        association.build();
      });
    });
  }

  /**
   * Creates the SQL table objects to be used to create SQL query text & parameters.
   *
   * All column metadata should have been added before calling this.
   */
  private buildSQLEntity() {
    const models = ModelManager.getModels();
    const _self = this;
    models.forEach(model => {
      const entityMetadata = _self.getEntityMetadata(model);
      const metadata = Object.assign({}, entityMetadata);
      const sqlTable = define(metadata);
      this.table[metadata.name.toLowerCase()] = sqlTable;
    });
  }
}

export default new MetadataManager();