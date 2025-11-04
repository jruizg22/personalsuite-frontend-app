import type {SortOrder} from "./";

/**
 * Parameters for fetching a collection of items from an API.
 *
 * This interface defines a common contract for endpoints that
 * support pagination, view filtering, and sorting. It can be
 * extended or used directly as query parameters for REST requests.
 *
 * Each property is optional, allowing flexible combinations
 * depending on the endpoint’s capabilities.
 *
 * @example
 * // Example: Fetch 10 videos starting from item 20, with basic view
 * const params: GetAllParams = {
 *   offset: 20,
 *   limit: 10,
 *   view: "basic",
 *   order_by: "asc",
 * };
 */
export interface GetAllParams {
    /**
     * Optional pagination offset.
     *
     * Indicates how many items to skip from the beginning of the collection.
     * Useful for paginated API requests.
     *
     * @example
     * { offset: 20 } // skip the first 20 items
     */
    offset?: number;

    /**
     * Optional limit on the number of items to fetch.
     *
     * Defines the maximum number of items to return.
     * Commonly used in combination with `offset` for pagination.
     *
     * @example
     * { limit: 10 } // return only 10 items
     */
    limit?: number;

    /**
     * Optional view parameter.
     *
     * Used to specify the level of detail or representation
     * of the item(s) retrieved.
     *
     * The valid values typically come from a `views` constant
     * (e.g., `"basic"`, `"with_channel"`, etc.).
     *
     * @example
     * { view: "basic" } // Fetch only basic fields
     * @example
     * { view: "with_channel" } // Fetch including channel details
     */
    view?: string;

    /**
     * Optional sort direction for ordered results.
     *
     * Determines whether the API should return items
     * in ascending (`"asc"`) or descending (`"desc"`) order.
     *
     * The backend is responsible for applying this order,
     * usually mapping it to a SQL `ORDER BY` clause.
     *
     * @example
     * { order_by: "asc" } // Sort results ascendingly
     * @example
     * { order_by: "desc" } // Sort results descendingly
     */
    order_by?: SortOrder;
}