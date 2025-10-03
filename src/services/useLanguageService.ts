import { useTranslation } from "react-i18next";
import type { appRoute } from "../routes";

export function useLanguageService() {
    const { t, i18n } = useTranslation();

    function translateRouteLabel(route: appRoute): string {
        return route.i18nKey ? t(route.i18nKey, {ns: route.i18nNs}) : route.label;
    }

    return { translateRouteLabel, i18n };
}