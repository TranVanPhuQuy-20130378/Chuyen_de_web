import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from 'react-bootstrap';
import { default as queryString } from 'query-string';

import { addItemToCart } from '../../redux/redux_quy/Action_quy';
import Pagination from './Pagination';
import { Link } from "react-router-dom";
import {StarRate} from "../ProductDetailPage/ProductDetails";
import {formatNumber, formatRating} from "../../javascript/utils";
import { addLiked } from "../../redux/Action";

function DataProductsFeatured() {
    const [sanPham, setSanPham] = useState(null);
    const [phanTrang, setPhanTrang] = useState({});

    const [boLoc, setBoLoc] = useState({
        _limit: 8,
        _page: 1
    });

    useEffect(() => {
        async function fetchDanhSachSanPhamNoiBat() {
            try {
                const paramsString = queryString.stringify(boLoc);
                const requestUrl = `http://localhost:8080/api/products/fitter-product-hot?${paramsString}`;

                const response = await fetch(requestUrl);
                const responseJson = await response.json();

                console.log("Phản hồi API: ", responseJson);

                const { data, current_page, page_size, total_pages, total_items } = responseJson;

                setSanPham(data);

                setPhanTrang({
                    currentPage: current_page,
                    pageSize: page_size,
                    totalPages: total_pages,
                    totalItems: total_items
                });

            } catch (error) {
                console.log('Không thể tải danh sách sản phẩm nổi bật', error.message);
            }
        }

        fetchDanhSachSanPhamNoiBat();


        const element = document.getElementById("sect-product-featured");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }

    }, [boLoc]);

    function handlePageChange(newPage) {
        console.log('Trang mới: ' + newPage);
        setBoLoc({
            ...boLoc,
            _page: newPage
        });
    }

    return (
        <>
            <div className="row featured__filter">
                {Array.isArray(sanPham) && sanPham.length > 0 ? (
                    sanPham.map((product, index) => (
                        <ItemProductFeatured key={index} product={product}></ItemProductFeatured>
                    ))
                ) : (
                    <div>Không tìm thấy sản phẩm</div>
                )}
            </div>
            <div className="d-flex justify-content-center">
                <Pagination pagination={phanTrang} onPageChange={handlePageChange} currentPage={boLoc._page} />
            </div>
        </>
    );
}

function ItemProductFeatured({ product }) {
    const likedCodes = useSelector(state => state.likedCodesReducer.liked);
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    function clickAddItemToCart() {
        console.log(product);
        dispatch(addItemToCart(product));
        setShowToast(true);
    }

    function clickAddLiked() {
        dispatch(addLiked(product));
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
            <div>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body className="text-white" style={{ backgroundColor: '#7fad39' }}>

                        Sản phẩm đã được thêm vào giỏ hàng
                    </Toast.Body>
                </Toast>
            </div>

            <div className="product-item">
                <Link to={`products/product/${product.id}`} state={product} className="product-item-img">
                    <img src={product.listImg[0].path_image} alt="" />
                </Link>
                <div className="product-item-title d-flex justify-content-center align-items-center text-center pt-2">
                    <div className="title-wrapper">
                        <Link to={`products/product/${product.id}`} state={product}>{product.name}</Link>
                    </div>
                </div>
                <div className="product-item-stats d-flex justify-content-between"></div>
                <div className="product-item-actions d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start">
                        <a className={`mr-1 action-like ${likedCodes.some(c => c.id === product.id_product) && 'is-active'}`}>
                            <i className="fa fa-thumbs-up" onClick={clickAddLiked}></i>
                        </a>
                        <a className="product-item-action">
                            <i className="fa fa-shopping-cart" onClick={clickAddItemToCart}></i>
                        </a>
                    </div>
                    <div className="product-item-stars">
                        <StarRate stars={formatRating(product.rating_comment).average} type={"bi bi-star-fill"} />
                    </div>
                </div>
                <div className="product-item-bottom d-flex justify-content-between align-items-center">
                    {/*<div className="product-item-brand"><i className={product.type?.icon}></i> {product.type?.name}</div>*/}
                    <Link to={`products/product/${product.id}`} state={product}
                          className="product-item-price">{formatNumber(product.price, '.')}đ</Link>
                </div>
            </div>
        </div>
    );
}

export default DataProductsFeatured;
