export const fetchCodes = async (url) => await (await fetch(url)).json()

export const fetchPopularCodes = async () =>
    await (await fetch('http://localhost:9810/products?_sort=downloaded,viewed&_order=desc&_limit=10')).json()

export const fetchProducts = async () => await (await fetch(`http://localhost:9810/products`)).json()

export const putCodes = async (url, content) => await fetch(url, content)