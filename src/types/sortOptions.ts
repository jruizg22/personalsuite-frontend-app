import type {SortOrder} from "@/types";

/**
 * Options to configure sorting of a list.
 *
 * @template T - Type of the items in the list.
 */
export interface SortOptions<T> {
    sortBy?: keyof T;
    sortOrder?: SortOrder;
}