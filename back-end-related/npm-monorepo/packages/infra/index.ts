export type Entity = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const entity: Entity = {
  id: "1",
  name: "name",
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log(entity);
