/** List response shape agreed with the backend: GET /modules?page=&limit=... */
export interface Paginated<T> {
   data: T[];
   meta: {
      page: number;
      limit: number;
      total: number;
   };
}
