import {useMemo} from "react";
import type {SortOptions} from "@/types";

/**
 * React hook to sort a list of items based on a given key and order.
 *
 * The hook uses `useMemo` to avoid unnecessary re-sorting when the list
 * or sorting options haven't changed.
 *
 * Null, undefined, or empty string values are always placed at the end
 * for ascending order and at the beginning for descending order.
 *
 * @template T - Type of the items in the list. Must be an object with string keys.
 *
 * @param {T[]} list - The array of items to sort.
 * @param {SortOptions<T>} [options] - Optional sorting configuration.
 * @returns {T[]} A new array of items sorted according to the provided options.
 *
 * @example
 * ```ts
 * import { useSortList } from "@/hooks";
 *
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: null },
 *   { id: 3, name: "Bob" }
 * ];
 *
 * // Sort by name ascending
 * const sortedUsers = useSortList(users, { sortBy: "name", sortOrder: "asc" });
 * // Result: [{id:1,name:"Alice"}, {id:3,name:"Bob"}, {id:2,name:null}]
 *
 * // Sort by name descending
 * const sortedUsersDesc = useSortList(users, { sortBy: "name", sortOrder: "desc" });
 * // Result: [{id:2,name:null}, {id:3,name:"Bob"}, {id:1,name:"Alice"}]
 * ```
 *
 * @remarks
 * - The sorting is case-insensitive due to `localeCompare` with `sensitivity: "base"`.
 * - If `sortBy` is not provided, the original list is returned as-is.
 * - The hook creates a shallow copy of the list before sorting to avoid mutating the original array.
 */
export function useSortList<T extends Record<string, any>>(
    list: T[],
    options?: SortOptions<T>
): T[] {
    const { sortBy, sortOrder = "asc" } = options ?? {};

    return useMemo((): T[] => {
        if (!sortBy) return list;

        return [...list].sort((a: T, b: T): number => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            const aIsNull: boolean = aValue === null || aValue === undefined || aValue === "";
            const bIsNull: boolean = bValue === null || bValue === undefined || bValue === "";

            if (aIsNull && bIsNull) return 0;
            if (aIsNull) return sortOrder === "desc" ? -1 : 1;
            if (bIsNull) return sortOrder === "desc" ? 1 : -1;

            const aStr: string = String(aValue);
            const bStr: string = String(bValue);

            const result: number = aStr.localeCompare(bStr, undefined, { sensitivity: "base" });
            return sortOrder === "desc" ? -result : result;
        });
    }, [list, sortBy, sortOrder]);
}