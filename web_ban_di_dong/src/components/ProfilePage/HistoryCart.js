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

    // Function to handle view order details
    const viewOrderDetails = (orderId) => {
        // Redirect to a new route or show details in a modal, etc.
        console.log("View order details:", orderId);
        // Example: navigate(`/order-details/${orderId}`);
    };

    return (
        <>
            <Header />
            <SectionBreadcrumb breadcrumbs={breadcrumbs} />
            <section className="order-history">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* <h2>Lịch sử đơn hàng</h2> */}
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
                                                
                                                    <td>{order.totalAmount}</td>
                                                    <td>{order.addresss}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => viewOrderDetails(order.id)}
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
