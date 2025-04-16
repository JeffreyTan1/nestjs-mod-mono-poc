import { BaseValueObject } from '@common/domain/base.vo';

export type MetadataProps = Record<string, string>;

export class Metadata extends BaseValueObject<MetadataProps> {
  constructor(props: MetadataProps) {
    super(props);
  }
}
