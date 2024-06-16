import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2';

import {downloadFile} from "../../javascript/utils/Utils_Tuyen";

import {resetCart, showModalPayment, showModalPayPal, updateStatePayment} from "../../redux/redux_quy/Action_quy";
import {ButtonPayPal} from "../Commons/Buttons";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

import '../../css/modal.css';

export function ModalPayment() {


    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.cart);
    const email = localStorage.getItem("account")
    const showModal = useSelector(state => state.modalReducer.modal_payment);
    const checkPayment = useSelector(state => state.paymentReducer.payment);
    const payment = useSelector(state => state.paymentReducer);

    const wallets = [
        {
            name: 'Momo',
            link_image: 'https://sharecode.vn/assets/images/vi-momo.png',
        },
        {
            name: 'ViettelPay',
            link_image: 'https://sharecode.vn/assets/images/vi-vietel-pay.png',
        },
        {
            name: 'NganLuong',
            link_image: 'https://sharecode.vn/assets/images/vi-ngan-luong.png',
        }
    ]

    let content;
    const [contentRight, setContentRight] = useState(<div className="mt-4 notify-warning-content-right">Bạn cần thanh
        toán để tải
        code qua chức năng này!</div>);

    if (cart.length > 0) {
        content = (
            <Container>
                <Row>
                    <Col md={8}>
                        <div style={{height: '70px', overflowY: 'auto', overflowX: 'hidden'}}>


                        </div>
                    </Col>
                    <Col md={4}>
                      
                    </Col>
                </Row>
            </Container>
        )
    }


    const clickPayment = async (name_payment) => {
        // console.log("name "+name_payment);
        dispatch(updateStatePayment(name_payment)); // Gửi Action đến Store để cập nhật trạng thái thanh toán
            // console.log(cart);
        // Create list_order_detail from cart
        const list_order_detail = cart.map(item => ({
            id_product: item.id,
            quantity: 1
        }));

        // Calculate order value and total price
        const order_value = cart.reduce((sum, item) => sum + item.price, 0);
        const total_price = order_value; // Assuming no additional costs for simplicity

        // Create orderRequest object
        const orderRequest = {
            email,
            order_value,
            total_price,
            list_order_detail
        };
        console.log(orderRequest);
        try {
            const response = await fetch('http://localhost:8080/api/order/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderRequest)
            });

            if (response.ok) {
                const responseObject = await response.json();

                setTimeout(() => {
                    Swal.fire({
                        title: '',
                        text: 'Thanh toán đơn hàng thành công',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true
                    }).then(() => {
                        setContentRight(
                            <Row className="d-flex align-items-center justify-content-center">
                                <Row className="mt-3">
                                    <div className="notify-success-content-right">Bạn đã thanh toán thành công</div>
                                </Row>
                            </Row>
                        );
                    });
                }, 1000);
            } else {
                console.error('Failed to create order:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const clickCloseModal = () => {
        dispatch(showModalPayment(false)); // => đóng Modal thanh toán

        // nếu đơn hàng đã được thanh toán
        if (checkPayment === true) {
            dispatch(resetCart()); // reset lại giỏ hàng
            dispatch(updateStatePayment("reset")); // => reset lại trạng thái thanh toán
        }

        setTimeout(() => {
            console.log("Trạng thái của statePayment: ", JSON.stringify(payment))
        }, 1000)

    }

    const clickDownloadAll = () => {
        Swal.fire({
            title: '',
            text: 'Chức năng này đang được phát triển',
            icon: 'warning',
            confirmButtonText: 'OK',
            timer: 3000, // Thời gian tự động tắt thông báo sau 3 giây
            timerProgressBar: true // Hiển thị thanh tiến trình đếm ngược
        }).then(() => {

        })
    }

    const clickPaymentWithPaypal = () => {
        dispatch(showModalPayPal(true));
    }

    return (
        <>
            <ModalPaypal/>
            <div>
                <Modal size="lg" show={showModal}>
                    <Modal.Header className="header-modal">
                        <div className="header-content">
                            <div style={{color: '#8C6635', fontWeight: 'bold'}}><span>Chọn đơn vị thanh toán</span>
                            </div>
                            <div>
                                <button className="custom-close-button"
                                        onClick={() => clickCloseModal()}>X
                                </button>
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="body-content">
                            <div className="electronic-wallet" onClick={() => clickPaymentWithPaypal()}>
                                <img src="https://sharecode.vn/assets/images/btn-paypal.png" alt=""/>
                            </div>
                            {
                                wallets.map((value, index) => (
                                    <div className="electronic-wallet" key={index}
                                         onClick={() => clickPayment(value.name.toLowerCase())}>
                                        <img src={value.link_image} alt=""/>
                                    </div>
                                ))
                            }
                        </div>
                        {content}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export function ModalPaypal() {

    const showModal = useSelector(state => state.modalReducer.modal_paypal);
    const dispatch = useDispatch();
    const clickCloseModal = () => {
        dispatch(showModalPayPal(false)); // đóng cửa sổ thanh toán PayPal
        dispatch(showModalPayment(true)); // hiển thị cửa sổ thanh toán và download code
    }

    if (showModal === true) {
        dispatch(showModalPayment(false)); // đóng cửa sổ thanh toán và download code
    }

    return (
        <PayPalScriptProvider options={{
            "clientId": "test",
            components: "buttons",
            currency: "USD"
        }}>
            <Modal size="lg" show={showModal} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header>
                    <Modal.Title style={{color: '#84c52c', fontWeight: 'bold'}}>Thanh toán với PayPal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={8}>
                            <ButtonPayPal currency={"USD"}
                                          showSpinner={false}/>
                        </Col>
                        <Col xs={6} md={4} className="d-flex justify-content-center">
                            <Row>
                                <div>
                                    <img src="https://sharecode.vn/assets/images/secure.png" alt=""/>
                                </div>
                                <div style={{color: '#84c52c', fontWeight: 'bold'}}>Chứng nhận giao dịch an toàn!</div>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => clickCloseModal()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </PayPalScriptProvider>
    )
}