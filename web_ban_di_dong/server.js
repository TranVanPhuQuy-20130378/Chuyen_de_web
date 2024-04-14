// Nhúng thư viện json-server
const jsonServer = require('json-server');

// Tạo một server mới
const server = jsonServer.create();

// Tạo router và chỉ định đường dẫn tới file db.json chứa dữ liệu
const router = jsonServer.router('db.json');

// Tạo danh sách các middleware mặc định
const middlewares = jsonServer.defaults();

// Định nghĩa hàm render cho router
router.render = (req, res) => {
    if ((req.path === '/products') || (req.path === '/types')) return res.jsonp({
        data: res.locals.data,
        total: parseInt(res.getHeader('X-Total-Count'), 10)
    })
    const totalCountHeader = res.getHeader('x-total-count');

    // Kiểm tra nếu request method là GET và tồn tại header 'x-total-count'
    if (req.method === 'GET' && totalCountHeader) {

        //Đây là số lượng tổng số bản ghi có trong dữ liệu, được lấy từ header 'x-total-count' của phản hồi (response) trả về từ máy chủ.
        const totalCount = parseInt(totalCountHeader, 10);

        //Đây là số lượng bản ghi tối đa được trả về trong mỗi trang. Nó được lấy từ tham số truy vấn _limit của yêu cầu gửi đến API. Nếu _limit không được cung cấp, giá trị mặc định là 10.
        const limit = parseInt(req.query._limit, 10) || 10;

        // Đây là vị trí bắt đầu của bản ghi trong dữ liệu. Nó được tính toán bằng cách lấy trang hiện tại (lấy từ tham số truy vấn _page của yêu cầu) và nhân với giới hạn (limit), sau đó trừ đi 1. Nếu _page không được cung cấp, giá trị mặc định là 0.
        const offset = (parseInt(req.query._page, 10) - 1) * limit || 0;

        //  Đây là trang hiện tại đang được trả về. Nó được tính toán bằng cách chia vị trí bắt đầu của bản ghi (offset) cho giới hạn (limit), sau đó làm tròn lên và cộng thêm 1.
        const currentPage = parseInt(req.query._page, 10) || 1;

        //  Đây là tổng số trang có trong dữ liệu. Nó được tính toán bằng cách chia tổng số bản ghi (totalCount) cho giới hạn (limit), sau đó làm tròn lên.
        const totalPages = Math.ceil(totalCount / limit);

        res.set('x-total-count', totalCount); // Thêm header x-total-count vào phản hồi

        // Trả về dữ liệu phân trang và thông tin về phân trang
        res.jsonp({
            data: res.locals.data.slice(offset, offset + limit),
            pagination: {
                total: totalCount,
                limit: limit,
                totalPages: totalPages,
            },
        });
    } else {
        // Trường hợp không phải GET hoặc không có 'x-total-count' header, trả về dữ liệu ban đầu
        res.jsonp(res.locals.data);
    }
};

// Sử dụng các middleware mặc định
server.use(middlewares);

// Tái viết đường dẫn '/api/*' thành '/$1'
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}));

// Sử dụng router đã được tạo
server.use(router);

// Lắng nghe kết nối tới cổng 9810 và log thông báo khi server khởi động thành công
server.listen(9810, () => {
    console.log('JSON Server is running');
});
