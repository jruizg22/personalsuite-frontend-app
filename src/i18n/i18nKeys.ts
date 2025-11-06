/**
 * `commonKeys` is a readonly object containing translation keys
 * for general/common UI elements used throughout the application.
 *
 * Keys are structured hierarchically to match dialogs, actions,
 * form fields, and general messages.
 *
 * This object is intended for use with i18n translation functions.
 *
 * @example
 * import { commonKeys } from "@/i18nKeys";
 * t(commonKeys.actions.save); // => "Save"
 * t(commonKeys.fields.name);  // => "Name"
 */
export const commonKeys = {
    ns: "common",
    welcome: "welcome",
    start: "start",
    settings: "settings",
    language: "language",
    actions: "actions",
    id: "id",
    name: "name",
    url: "url",
    description: "description",
    details: "details",
    edit: "edit",
    delete: "delete",
    cancel: "cancel",
    save: "save",
    new: "new",
    close: "close",
    field_required: "field_required"
} as const;