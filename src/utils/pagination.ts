export const getPaginationData = <T>(result: { count: number; items: T[] }, limit: number, page?: number) => {
  const { count, items } = result;
  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(count / limit);
  return { totalItems: count, items, totalPages, currentPage }  
}