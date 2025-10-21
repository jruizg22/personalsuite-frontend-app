/**
 * Parameters for fetching a collection of items from an API.
 *
 * This interface is generic to allow specifying a type for `view`,
 * which represents the level of detail of the item(s) retrieved
 *
 * @template T - Type of the `view` property, typically an enum or string literal type.
 */
export interface GetAllParams<T> {
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
     * Can be used to specify the level of detail of the item retrieved.
     * The type `T` allows this to be strongly typed,
     * for example as an enum of allowed views.
     *
     * @example
     * { view: "basic" } // fetch basic data of the item
     */
    view?: T;
}