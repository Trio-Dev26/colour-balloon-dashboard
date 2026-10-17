/** A paginated list as the backend sends it (GET /admin/modules, GET /admin/units). */
export interface ApiPage<T> {
   items: T[];
   total: number;
   page: number;
   limit: number;
}

/** A paginated list as the screens use it; services convert ApiPage with toPaginated(). */
export interface Paginated<T> {
   data: T[];
   meta: {
      page: number;
      limit: number;
      total: number;
   };
}
