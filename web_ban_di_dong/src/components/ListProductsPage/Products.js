import '../../css/products.css';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLiked, setLayout, setPage, setSort} from "../../redux/Action";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {StarRate} from "../ProductDetailPage/ProductDetails";
import {formatNumber, formatRating, getTypeName, makeURL} from "../../javascript/utils";
import {addItemToCart} from "../../redux/redux_quy/Action_quy";
import {Toast} from "react-bootstrap";
import Header from "../Commons/Header";
import Footer from "../Commons/Footer";
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import {fetchCodes, fetchPopularCodes, fetchVendor} from "../../javascript/api/Api_phong";

export function PopularCode() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchPopularCodes().then(json => setData(json.data))
    }, [])

    return (
        <div className="sidebar-item sidebar-popular mt-5">
            <h6 className="list-group-item">Sản phẩm phổ biến</h6>
            <div className="list-group">
                {data.map((product) => (
                    <Link to={`/products/product/${product.id}`} state={product} className="list-group-item" key={product.id}>
                        <img className="mr-2" src={product.listImg[0].path_image} alt=""/>
                        <span className="popular-title">{product.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function SideBar({type}) {
    const [types, setTypes] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetchVendor().then(data => setTypes(data))
    }, [])
    function handleClick(type) {
        dispatch(setPage(1))
        dispatch(setSort(null))
        navigate(`/products?type=${type}`)
    }

    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <h6 className="list-group-item">Phân loại điện thoại</h6>
                <div className="list-group">
                    {types.map(value => (
                        <div className={`list-group-item ${value.id === type && 'item-active'}`} key={value.id}
                             onClick={() => handleClick(value.vendorName)}>
                            <div className="list-group-item-left">
                                <span><img src={value.id === type ? value.img.replace('-alt', '') : value.vendorLocation} alt=""/></span>
                                <span>{value.vendorName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <PopularCode/>
        </div>
    )
}

export function ProductItemRow({p, navigate, addToLiked, addToCart}) {
    const likedCodes = useSelector(state => state.likedCodesReducer.liked)

    return (
        <div className="product-item-row mb-4">
            <div className="row no-gutters">
                <Link to={`product/${p.id}`} state={p} className="product-item-img col-lg-4 pr-3">
                    <img src={p.listImg[0].path_image} alt=""/>
                </Link>
                <div className="product-item-row-content col-lg-6">
                    <Link to={`product/${p.id}`} state={p} className="product-item-row-title">{p.name}</Link>
                    <div className="product-item-brand" onClick={() => navigate(p.type.id)}>
                        {/*<img src={p.type.img.replace('-alt', '')} alt=""/> {p.type.name}*/}
                    </div>
                    <div className="product-item-stars"><StarRate stars={formatRating(p.rating).average} type={"bi bi-star-fill"}/></div>
                    <div className="product-item-stats d-flex justify-content-start">
                        <div><i className="fa fa-eye"></i> {p.view}</div>
                        <div><i className="fa fa fa-shopping-cart"></i> {p.buy}</div>
                    </div>
                </div>
                <div className="col-lg-2 d-flex flex-column justify-content-end align-items-end">
                    <div className="pr-3 pb-3">
                        <div className="product-item-row-price text-center">
                            <Link to={`product/${p.id}`} state={p}
                                  className="d-inline text-center">{p.price === 0 ? 'FREE' : formatNumber(p.price, '.') + 'đ'}</Link>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className={`mr-1 action-like ${likedCodes.some(c => c.id === p.id) && 'is-active'}`} onClick={() => addToLiked(p)}><i
                                className="fa fa-thumbs-up"></i></div>
                            <div className="product-item-action" onClick={() => addToCart(p)}><i className="fa fa-shopping-cart"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ProductItem({p, navigate, addToLiked, addToCart}) {
    const likedCodes = useSelector(state => state.likedCodesReducer.liked)
    const [showToast, setShowToast] = useState(false)

    function onAddToCartClicked(p) {
        setShowToast(true)
        addToCart(p)
    }

    return (
        <>
            <div>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body className="text-white" style={{backgroundColor: '#7fad39'}}>
                        Sản phẩm  đã được thêm vào giỏ hàng
                    </Toast.Body>
                </Toast>
            </div>
            <div className="product-item">
                <Link to={`/products/product/${p.id}`} state={p} className="product-item-img">
                    <img src={p.listImg[0].path_image} alt=""/>
                </Link>
                <div className="product-item-title d-flex justify-content-center align-items-center text-center pt-2">
                    <div className="title-wrapper">
                        <Link to={`/products/product/${p.id}`} state={p}>{p.name}</Link>
                    </div>
                </div>
                <div className="product-item-stats d-flex justify-content-between">
                    <div><i className="fa fa-eye"></i> {p.view}</div>
                    <div><i className="fa fa-shopping-cart"></i> {p.buy}</div>
                </div>
                <div className="product-item-actions d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-start">
                        <div className={`mr-1 action-like ${likedCodes.some(c => c.id === p.id) && 'is-active'}`}
                             onClick={() => addToLiked(p)}><i
                            className="fa fa-thumbs-up"></i></div>
                        <div className="product-item-action" onClick={() => onAddToCartClicked(p)}><i className="fa fa-shopping-cart"></i></div>
                    </div>
                    <div className="product-item-stars"><StarRate stars={formatRating(p.rating).average} type={"bi bi-star-fill"}/></div>
                </div>
                <div className="product-item-bottom d-flex justify-content-between align-items-center">
                    <div className="product-item-brand" onClick={() => navigate(p.type.id)}>
                        {/*<img src={p.type.img.replace('-alt', '')} alt=""></img> {p.type.name}*/}
                    </div>
                    <Link to={`/products/product/${p.id}`} state={p}
                          className="product-item-price">{p.price === 0 ? 'FREE' : formatNumber(p.price, '.') + 'đ'}</Link>
                </div>
            </div>
        </>

    )
}

export function Filter({total}) {
    const sort = useSelector(state => state.listProductsReducer.sort)
    const layout = useSelector(state => state.listProductsReducer.layout)
    const dispatch = useDispatch()

    return (
        <div className="filters mb-4">
            <div className="row">
                <div className="col-lg-4 d-flex align-items-center">
                    <div className="filter-found">
                        <h6>Tìm thấy <b>{total}</b> sản phẩm</h6>
                    </div>
                </div>
                <div className="col-lg-8 d-flex justify-content-end align-items-center">
                    <div className="filter-sort mr-5">
                        <span>SẮP XẾP</span>
                        <ul className="d-inline-block">
                            <li className={sort === null && "filter-active"} onClick={() => dispatch(setSort(null))}>Mới nhất</li>
                            <li className={sort === 'viewed' && "filter-active"} onClick={() => dispatch(setSort('viewed'))}>Xem nhiều</li>
                            <li className={sort === 'downloaded' && "filter-active"} onClick={() => dispatch(setSort('downloaded'))}>Tải nhiều</li>
                        </ul>
                    </div>
                    <div className="filter-layout d-flex align-items-center">
                        <span className={`bx bx-grid-alt ${layout === 'grid' && "filter-active"}`} onClick={() => dispatch(setLayout('grid'))}></span>
                        <span className={`bx bx-list-ul ${layout === 'row' && "filter-active"}`} onClick={() => dispatch(setLayout('row'))}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Pagination({ total }) {
    const currentPage = useSelector(state => state.listProductsReducer.page);
    const dispatch = useDispatch();
    const itemsPerPage = 12; // Assuming 12 items per page
    const totalPages = Math.ceil(total / itemsPerPage);

    function onSwitchPage(page) {
        const pageNow = page < 1 ? 1 : page > totalPages ? totalPages : page;
        dispatch(setPage(pageNow));
    }

    return (
        <>
            {total ? (
                <ul className="product-pagination float-right mt-3">
                    <li onClick={() => onSwitchPage(currentPage - 1)}><i className="fa fa-chevron-left"></i></li>
                    {[...Array(totalPages).keys()].map((_, index) => (
                        <li
                            className={index + 1 === currentPage ? "active" : ""}
                            key={index}
                            onClick={() => onSwitchPage(index + 1)}
                        >
                            {index + 1}
                        </li>
                    ))}
                    <li onClick={() => onSwitchPage(currentPage + 1)}><i className="fa fa-chevron-right"></i></li>
                </ul>
            ) : null}
        </>
    );
}

export function ProductContainer({query, total, data, forLiked}) {
    const layout = useSelector(state => state.listProductsReducer.layout)
    const dispatch = useDispatch()
    const nav = useNavigate()

    function navigate(type) {
        dispatch(setPage(1))
        dispatch(setSort(null))
        nav(`/products?type=${type}`)
    }

    function addToLiked(code) {
        dispatch(addLiked(code))
    }

    function addToCart(code) {
        dispatch(addItemToCart(code))
    }

    return (
        <>
            {total ? (
                <div className="row">
                    {data.map((value, index) => {
                        return layout === 'grid' ?
                            (<div className={`product-item-container col-lg-${forLiked ? '3' : '4'}`} key={index}>
                                <ProductItem p={value} navigate={navigate} addToLiked={addToLiked} addToCart={addToCart}/>
                            </div>) :
                            (<div className="product-item-container col-lg-12" key={index}>
                                <ProductItemRow p={value} navigate={navigate} addToLiked={addToLiked} addToCart={addToCart}/>
                            </div>)
                    })}
                </div>
            ) : (
                <div className="search-not-found">
                    {forLiked ? <img src={require('../../img/empty.png')} alt=""/> : <img src={require('../../img/not_found.jpg')} alt=""/>}
                    {forLiked ? <div>Danh mục yêu thích trống</div> : <div>Không có kết quả</div>}
                    {!forLiked && <div>Không tìm thấy sản phẩm cho từ khóa <span>{query}</span></div>}
                </div>
            )}
        </>
    )
}

export function ProductsContent({ group }) {
    const page = useSelector(state => state.listProductsReducer.page)-1;
    const sort = useSelector(state => state.listProductsReducer.sort);
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const location = useLocation();
    const type = new URLSearchParams(location.search).get('type');
    const query = new URLSearchParams(location.search).get('search');
    const from = new URLSearchParams(location.search).get('from');

    useEffect(() => {
        const url = makeURL(query, from, type, page, sort);
        fetchCodes(url).then(json => {
            setProducts(json.data);
            setTotalProducts(json.total);
        });
    }, [page, sort, type, query, from]);

    function breadcrumbs() {
        const home = { name: 'Trang chủ', link: '/' };
        const ds = location.pathname.includes('products') ? { name: 'Danh sách san pham', link: '/products' } : undefined;
        const t = type && { name: getTypeName(type), link: `/products?type=${type}` };
        const tc = location.pathname.includes('sale') ? { name: 'Sale', link: '/sale' } : undefined;
        const qc = location.pathname.includes('hot') ? { name: 'Sp hot', link: '/hot' } : undefined;
        const fc = location.pathname.includes('old') ? { name: 'old', link: '/old' } : undefined;
        return [home, ds, t, tc, qc, fc].filter(i => i);
    }

    return (
        <>
            <SectionBreadcrumb breadcrumbs={breadcrumbs()} />
            <section className="product">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <SideBar type={type} />
                        </div>
                        <div className="col-lg-9 col-md-7 pl-4">
                            <Filter total={totalProducts} />
                            <ProductContainer query={query} total={totalProducts} data={products} />
                            <Pagination total={totalProducts} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default function Products() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
