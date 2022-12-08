import { ID } from './../types/common.d';
import { PaginationInfo } from '../types/pagination';

export abstract class BaseRepository<M> {
  abstract idField: string;
  public abstract find(criteria: Partial<M>, pagination?: PaginationInfo): Promise<Partial<M>[]>;
  public abstract findById(id: ID): Promise<Partial<M>>;
  public abstract findOne(criteria: Partial<M>): Promise<Partial<M>>;
  public abstract create(data: Partial<M>): Promise<M>;
  public abstract update(criteria: Partial<M>, data: Partial<M>, options?): Promise<boolean>;
  public abstract delete(id: ID): Promise<boolean>;
}
