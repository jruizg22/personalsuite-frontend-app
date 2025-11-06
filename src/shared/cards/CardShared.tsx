import {type JSX} from "react";
import {Card, CardHeader, type CardProps, Tooltip} from "@mui/material";
import type {MenuAction} from "@/types";
import {ThreeDotMenu} from "@/shared/menus";

/**
 * `CardShared` component.
 *
 * A reusable, stylized wrapper for displaying content inside a Material UI `Card`
 * with a configurable header section.
 *
 * It provides:
 * - A title with optional line clamping and tooltip overflow handling
 * - An optional three-dot action menu (`ThreeDotMenu`)
 * - A clean visual separation between the header and the card content
 *
 * The component is designed to be used as a base layout for CRUD cards,
 * dashboards, or media display cards where uniform height and consistent
 * alignment are important.
 *
 * @example
 * ```tsx
 * <CardShared
 *   headerTitle="Example Card"
 *   actions={[editAction, deleteAction]}
 *   headerHeight={56}
 *   headerTitleLines={2}
 * >
 *   <CardContent>
 *     <Typography variant="body2">Some content here...</Typography>
 *   </CardContent>
 * </CardShared>
 * ```
 */
interface Props {
    /** The text title displayed in the card header. */
    headerTitle: string;

    /**
     * The MUI card variant to use.
     * Common options are `'elevation'` or `'outlined'` (default).
     */
    variant?: CardProps['variant'];

    /** The card's inner content (usually a `<CardContent>` element). */
    children: JSX.Element;

    /**
     * Optional list of menu actions for the header’s `ThreeDotMenu`.
     * If not provided, the menu button will not be rendered.
     */
    actions?: MenuAction[];

    /**
     * Optional fixed height (in pixels or responsive units) for the card header.
     * If omitted, the header height adapts to its content.
     */
    headerHeight?: number;

    /**
     * Number of lines to display for the header title before truncation.
     * - `1`: Single line, text truncated with ellipsis (`nowrap`)
     * - `2+`: Multi-line with ellipsis via CSS `-webkit-line-clamp`
     *
     * @default 2
     */
    headerTitleLines?: number;
}

/**
 * A flexible, well-styled Material UI card component with:
 * - Header title truncation and tooltip overflow support
 * - Optional fixed header height
 * - Optional action menu (top-right)
 * - Consistent bottom border for visual separation
 */
export default function CardShared({
    headerTitle,
    variant = 'outlined',
    children,
    actions = [],
    headerHeight,
    headerTitleLines = 2,
}: Props): JSX.Element {
    // Determines if title is multi-line (for layout alignment and truncation)
    const isMultiLine: boolean = headerTitleLines > 1;

    return (
        <Card
            variant={variant}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: '100%'
            }}
        >
            <CardHeader
                /**
                 * Wrap the header title inside a tooltip, so if the text is truncated
                 * (by line clamp or ellipsis), users can still read the full title on hover.
                 */
                title={
                    <Tooltip title={headerTitle}>
                        <span>{headerTitle}</span>
                    </Tooltip>
                }
                /**
                 * Conditionally render the three-dot action menu.
                 * The menu remains visually fixed to the top-right corner.
                 */
                action={actions.length > 0 ? <ThreeDotMenu actions={actions} /> : null}
                sx={{
                    /**
                     * Adds a subtle bottom border that visually separates
                     * the header from the card's main content.
                     */
                    borderBottom: theme => `1px solid ${theme.palette.divider}`,
                    // Apply fixed header height if specified
                    ...(headerHeight && {
                        minHeight: `${headerHeight}px`,
                        maxHeight: `${headerHeight}px`,
                    }),
                    // Align header text vertically depending on the number of lines
                    alignItems: isMultiLine ? "flex-start" : "center",
                    "& .MuiCardHeader-content": {
                        overflow: "hidden",
                        display: "block",
                        width: "100%",
                        "& .MuiCardHeader-title": {
                            // Multi-line truncation support
                            display: isMultiLine ? "-webkit-box" : "block",
                            WebkitBoxOrient: "vertical",
                            ...(isMultiLine && { WebkitLineClamp: headerTitleLines }),
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: isMultiLine ? "normal" : "nowrap",
                            lineHeight: 1.3,
                            // Small top padding to visually center multi-line titles
                            pt: 0.25,
                        },
                    },
                }}
            />
            {/* Main content area (passed via children) */}
            {children}
        </Card>
    )
}