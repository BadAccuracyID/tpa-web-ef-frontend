export function trimUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        url = url.substring(url.indexOf('/', 8));
    }
    if (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }

    return url;
}
