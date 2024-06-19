import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../../javascript/api/Api";
import Header from "../Commons/Header";
import Footer from "../Commons/Footer";
import '../../css/OrderDetail.css'
function OrderDetail() {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const email = localStorage.getItem("account");

    useEffect(() => {
        async function fetchOrderDetail() {
            try {
                setLoading(true);
                const data = await getOrderDetail(email, orderId);
                setOrderDetail(data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrderDetail();
    }, [email, orderId]);

    if (loading) {
        return <p>Đang tải chi tiết đơn hàng...</p>;
    }

    if (!orderDetail || !orderDetail.data || orderDetail.data.length === 0) {
        return <p>Không tìm thấy chi tiết đơn hàng.</p>;
    }

    return (
        <>
            <Header />
            <div className="container">
                <h2>Chi tiết đơn hàng {email}</h2>
                <div className="order-details">
                    {orderDetail.data.map((item) => (
                        <div key={item.id} className="product-item">
                            <h3>{item.productName}</h3>
                            <p>Số lượng: {item.quantity}</p>
                            <p>Đơn giá: {item.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            <p>Thành tiền: {item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    ))}
                </div>
                <div className="total-amount">
                    <p>Tổng tiền: {orderDetail.data.reduce((acc, item) => acc + item.totalPrice, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderDetail;
