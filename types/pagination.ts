// Pagination types and helpers
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationInfo;
}

export const calculatePagination = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

export const getPageRange = (
  currentPage: number,
  totalPages: number,
  visiblePages = 5
): number[] => {
  const half = Math.floor(visiblePages / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + visiblePages - 1);
  start = Math.max(1, end - visiblePages + 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
