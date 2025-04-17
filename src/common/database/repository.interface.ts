export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  save(data: T): Promise<T>;
  delete(data: T): Promise<void>;
}
