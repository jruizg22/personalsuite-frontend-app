import {type JSX} from "react";
import {useMenuActions} from "@/shared/menus/useMenuActions";
import type {MenuAction} from "@/types";
import {CardShared} from "@/shared/cards";

interface Props<T> {
    item: T,
    getTitle: (item: T) => string,
    renderContent: (item: T) => JSX.Element,
    onEdit: () => void;
    onDelete: () => void;
}

export default function CrudCardItem<T>({
    item,
    getTitle,
    renderContent,
    onEdit,
    onDelete
}: Props<T>): JSX.Element {
    const { edit, delete: del } = useMenuActions();

    const actions: MenuAction[] = [edit(onEdit), del(onDelete)];

    return (
        <CardShared headerTitle={getTitle(item)} actions={actions}>
            {renderContent(item)}
        </CardShared>
    );
}