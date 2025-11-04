/**
 * Represents the possible sort directions for ordered queries.
 *
 * Used to specify whether results should be sorted
 * in ascending (`"asc"`) or descending (`"desc"`) order.
 *
 * Commonly combined with `order_by` or similar parameters
 * when fetching data from APIs or databases.
 *
 * @example
 * const sortOrder: SortOrder = "asc";
 */
export type SortOrder = "asc" | "desc";