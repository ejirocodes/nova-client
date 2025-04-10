/**
 * Format volume with abbreviations (K, M, B - thousands, millions, billions)
 * @param volume - The volume to format (e.g. 1000000000)
 * @returns The formatted volume (e.g. "1.23B")
 */
export function abbreviateVolume(volume: number) {
    if (volume >= 1_000_000_000) {
        return `${(volume / 1_000_000_000).toFixed(2)}B`;
    } else if (volume >= 1_000_000) {
        return `${(volume / 1_000_000).toFixed(2)}M`;
    } else if (volume >= 1_000) {
        return `${(volume / 1_000).toFixed(2)}K`;
    }
    return volume.toString();
};


export function formatCurrency(price: number, currency: string = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(price);
};