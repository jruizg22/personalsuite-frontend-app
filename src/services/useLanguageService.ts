import {useTranslation} from "react-i18next";
import type {i18nProps} from "@/types";

export function useLanguageService() {
    const { t, i18n } = useTranslation();

    function translateLabel({ i18nKey, i18nNs }: i18nProps, fallback: string): string {
        return t(i18nKey, { ns: i18nNs, defaultValue: fallback });
    }

    return { translateLabel, i18n, t };
}