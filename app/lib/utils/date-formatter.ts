export function formatShortDateTime(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
};