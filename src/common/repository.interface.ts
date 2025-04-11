export interface IRepository<T> {
  save(aggregate: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  remove(aggregate: T): Promise<void>;
}
