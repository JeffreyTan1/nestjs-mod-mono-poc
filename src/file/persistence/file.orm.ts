import { Entity, PrimaryColumn } from 'typeorm';

@Entity('file')
export class FileOrm {
  @PrimaryColumn('uuid')
  id: string;
}
