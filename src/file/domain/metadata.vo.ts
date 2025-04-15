import { BaseValueObject } from '@/common/domain/base.vo';

type MetadataProps = Record<string, string>;

export class Metadata extends BaseValueObject<MetadataProps> {
  constructor(props: MetadataProps) {
    super(props);
  }
}
