export async function getListDiscountCode() {
    try {
        const response = await fetch('http://localhost:9810/api/discount-code');
        const responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e.getMessage());
    }
    /* lấy ra danh sách mã giảm giá từ server */
}
