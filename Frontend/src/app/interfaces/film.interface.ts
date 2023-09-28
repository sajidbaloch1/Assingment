export interface IFilm {
  id?: number;
  name?: string;
  photo?: string;
  genre?: string;
  ticket_price?: number;
  description?: string;
  release_date?: Date;
  country?: string;
}
export interface IListInterface<T> {
    data: T[];
    total_count: number;
    limit: number;
  }
  export interface IKeyMapping<T = string> {
    [key: string]: T;
  }