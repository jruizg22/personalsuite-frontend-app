import type {appTab} from "@/types";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";
import {ChannelsTab} from "@media-tracker/pages/youtube/channels";
import {VideosTab} from "@media-tracker/pages/youtube/videos";

/**
 * Application tab configuration for the YouTube management section.
 *
 * @constant
 * @type {appTab[]}
 * @description
 * Defines the structure and metadata for the YouTube-related tabs within the app’s
 * navigation system. Each tab entry specifies:
 * - A **label** (for fallback or debugging).
 * - The associated **React component** to render.
 * - Internationalization keys for localized labels.
 *
 * ---
 * ### Purpose:
 * Centralizes tab definitions for the YouTube dashboard, enabling easy addition or
 * removal of sections (e.g., Channels, Videos) while maintaining consistent structure.
 *
 * ---
 * ### Structure:
 * Each `appTab` entry includes:
 * - `label`: A default or fallback tab title (non-translated).
 * - `Component`: The React component rendered when the tab is active.
 * - `i18nProps`: Translation metadata:
 *   - `i18nKey`: The translation key for the tab label.
 *   - `i18nNs`: The i18n namespace where the key is located.
 *
 * ---
 * ### Example Usage:
 * ```tsx
 * import { tabs } from "@/pages/youtube/tabs";
 * import { Tabs, Tab } from "@mui/material";
 * import { useTranslation } from "react-i18next";
 *
 * function YouTubeDashboard() {
 *   const { t } = useTranslation();
 *   const [activeTab, setActiveTab] = useState(0);
 *
 *   return (
 *     <>
 *       <Tabs value={activeTab} onChange={(_, i) => setActiveTab(i)}>
 *         {tabs.map((tab, i) => (
 *           <Tab key={tab.label} label={t(tab.i18nProps.i18nKey, { ns: tab.i18nProps.i18nNs })} />
 *         ))}
 *       </Tabs>
 *
 *       <div style={{ marginTop: 16 }}>
 *         <tabs[activeTab].Component />
 *       </div>
 *     </>
 *   );
 * }
 * ```
 *
 * ---
 * ### Defined Tabs:
 * | Label   | Component   | Description                 |
 * |----------|--------------|-----------------------------|
 * | Channels | `ChannelsTab` | Manage YouTube channels.   |
 * | Videos   | `VideosTab`   | Manage YouTube videos.     |
 */
export const tabs: appTab[] = [
    {
        label: "Channels",
        Component: ChannelsTab,
        i18nProps: {
            i18nKey: mediaTrackerKeys.youTube.channels.root,
            i18nNs: mediaTrackerKeys.ns
        }
    },
    {
        label: "Videos",
        Component: VideosTab,
        i18nProps: {
            i18nKey: mediaTrackerKeys.youTube.videos.root,
            i18nNs: mediaTrackerKeys.ns
        }
    }
]