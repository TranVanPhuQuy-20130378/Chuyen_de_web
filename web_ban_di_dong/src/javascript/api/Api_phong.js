export const fetchCodes = async (url) => await (await fetch(url)).json()

export const fetchPopularCodes = async () =>
    await (await fetch('http://localhost:8080/api/products?sort=buy,view&order=desc&size=10')).json()

export const fetchVendor = async () => await (await fetch(`http://localhost:8080/api/vendors`)).json()

export const putCodes = async (url, content) => await fetch(url, content)