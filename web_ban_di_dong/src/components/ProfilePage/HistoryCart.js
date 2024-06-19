import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrderItems } from "../../javascript/api/Api";
import Header from "../Commons/Header";
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import Footer from "../Commons/Footer";

const breadcrumbs = [{ name: "Trang chủ", link: "/" }, { name: "Lịch sử đơn hàng", link: "/historyCart" }];

function HistoryCart() {
    const navigate = useNavigate();
    const storedEmail = localStorage.getItem("account");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!storedEmail) {
            navigate("/login");
        }
    }, [navigate, storedEmail]);

    useEffect(() => {
        async function fetchOrderHistory() {
            try {
                const data = await getAllOrderItems(storedEmail);
                setOrders(data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        }

        fetchOrderHistory();
    }, [storedEmail]);

    const viewOrderDetails = (email, orderId) => {
        navigate(`/order-details/${orderId}`);
    };
    
    return (
        <>
            <Header />
            <SectionBreadcrumb breadcrumbs={breadcrumbs} />
            <section className="order-history">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {orders.length === 0 ? (
                                <p>Bạn chưa có đơn hàng nào.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Số thứ tự</th>
                                                <th>Ngày đặt</th>
                                                <th>Tổng tiền</th>
                                                <th>Địa chỉ</th>
                                                <th>Chi tiết đơn hàng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr key={order.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                    <td>{order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                    <td>{order.addresss}</td>
                                                    <td className="text-center">
                                                   <button
                                                    className="btn btn-primary"
                                                    onClick={() => viewOrderDetails(storedEmail, order.id)}
                                                                       >
                                                      Xem
                                                        </button>
                                                      </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default HistoryCart;
