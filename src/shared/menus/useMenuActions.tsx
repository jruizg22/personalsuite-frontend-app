import type {MenuAction} from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {commonKeys} from "@i18n/i18nKeys.ts";
import {useTranslation} from "react-i18next";

export function useMenuActions() {
    const { t } = useTranslation();

    const actions = {
        edit: (onClick: () => void): MenuAction => ({
            label: t(commonKeys.edit, { ns: commonKeys.ns, defaultValue: "Edit" }),
            icon: <EditIcon fontSize="small" />,
            onClick,
        }),
        delete: (onClick: () => void): MenuAction => ({
            label: t(commonKeys.delete, { ns: commonKeys.ns, defaultValue: "Delete" }),
            icon: <DeleteIcon fontSize="small" />,
            color: "error.main",
            onClick,
        }),
    };

    return actions;
}