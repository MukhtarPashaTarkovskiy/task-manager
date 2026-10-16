const originalFetch = window.fetch.bind(window);

window.fetch = function (url, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const requestUrl = new URL(url, window.location.href);
    const isSameOrigin = requestUrl.origin === window.location.origin;

    if (isSameOrigin && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        const csrfToken = document.querySelector('meta[name="_csrf"]')?.content;
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.content;

        if (csrfToken && csrfHeader) {
            const headers = new Headers(options.headers);
            headers.set(csrfHeader, csrfToken);

            options = {
                ...options,
                headers
            };
        }
    }

    return originalFetch(url, options);
};