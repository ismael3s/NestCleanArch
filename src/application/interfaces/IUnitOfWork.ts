export interface IUnitOfWork {
  getRepository<T>(repository: string): T;
  transactional<T>(work: () => Promise<T>): Promise<T>;
}
