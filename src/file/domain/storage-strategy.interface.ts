export interface IStorageStrategy {
  identifier: string;

  store(file: File): Promise<void>;
  retrieveUrl(path: string): Promise<string>;
  delete(path: string): Promise<void>;
}
