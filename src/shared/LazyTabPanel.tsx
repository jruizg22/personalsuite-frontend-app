import {type JSX, useState} from "react";

interface Props {
    value: number;
    index: number;
    children: JSX.Element;
}

export function LazyTabPanel({ value, index, children }: Props): JSX.Element | null {
    const [mounted, setMounted] = useState<boolean>(false);

    // Mount the panel when first loaded
    if (value === index && !mounted) {
        setMounted(true);
    }

    // If never opened, nothing is rendered
    if (!mounted) return null;

    // If it was opened, it stays cached
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            style={{ height: "100%", width: "100%" }}
        >
            {children}
        </div>
    );
}