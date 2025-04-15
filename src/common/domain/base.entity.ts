import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  protected readonly id: string;

  constructor(id?: string) {
    this.id = id ?? uuidv4();
  }

  public getId(): string {
    return this.id;
  }
}
