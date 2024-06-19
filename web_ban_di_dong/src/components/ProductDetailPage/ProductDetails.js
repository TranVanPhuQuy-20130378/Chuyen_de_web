import '../../css/product-detail.css'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {formatNumber, formatRating, getFirstLetter, getPassedTimeInText} from "../../javascript/utils";
import Parser from 'html-react-parser'
import {useDispatch, useSelector} from "react-redux";
import {addLiked} from "../../redux/Action";
import {addItemToCart} from "../../redux/redux_quy/Action_quy";
import {PopularCode} from "../ListProductsPage/Products";
import {fetchCodes, putCodes} from "../../javascript/api/Api_phong";
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";
import axios from 'axios';


function DetailLeft({ product }) {
    const [slideIndex, setSlideIndex] = useState(0);

    function moveSlide(dir) {
        const currentSlide = slideIndex + dir;
        if (currentSlide > -1 && currentSlide < product.listImg.length) {
            setSlideIndex(currentSlide);
        }
    }

    return (
        <div className="detail-left">
            <div className="detail-slider">
                {product.listImg.map((img, index) => (
                    <div
                        key={index}
                        className="detail-slide"
                        style={{ transform: `translateX(${100 * (index - slideIndex)}%)` }}
                    >
                        <img src={img.path_image} alt="" />
                    </div>
                ))}
            </div>
            <button className="btn slide-arrow btn-prev" onClick={() => moveSlide(-1)}>
                <i className="bi bi-chevron-left"></i>
            </button>
            <button className="btn slide-arrow btn-next" onClick={() => moveSlide(1)}>
                <i className="bi bi-chevron-right"></i>
            </button>
            <div className="slider-thumbnails d-flex justify-content-between">
                {product.listImg.map((img, index) => (
                    <div
                        key={index}
                        className={slideIndex === index ? 'active' : ''}
                        onClick={() => setSlideIndex(index)}
                    >
                        <img src={img.path_image} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function StarRate({stars, type}) {
    const fullStars = Math.floor(stars)
    const remain = (5 - stars) - Math.floor(5 - stars)
    return (
        <>
            {Array(fullStars).fill(1).map((value, index) => (<i className={type} key={index}></i>))}
            {remain < 1 && remain > 0 && <i className={type} key={fullStars} style={{color: '#BEBEBE'}}></i>}
            {Array(Math.floor(5 - stars)).fill(1).map((value, index) =>
                (<i className={type} key={index} style={{color: '#BEBEBE'}}></i>))}
        </>
    )
}

function DetailCenter({product}) {

    return (
        <div className="detail-center">
            <h6>{product.name} <span> </span></h6>
            <div className="detail-center-stats">
                <div className="product-item-stars mr-3">
                    <StarRate stars={formatRating(product.rating).average} type={"bi bi-star-fill"}/>
                </div>
                <span>({formatRating(product.rating).total} Đánh giá)</span>
                <span><i className="fa fa-eye"></i> {product.view}</span>
                <span><i className="fa fa-shopping-cart"></i> {product.buy}</span>
            </div>
            <div className="detail-center-info">
                <div>
                    <i className="fa fa-list"></i><span>Danh mục</span> <Link to={`/products?type=${product.vendor}`}>{product.vendor}</Link>
                </div>
                <div><i className="fa fa-layer-group"></i><span>Nhóm sản phẩm </span> <Link to={'/sale'}>Top sản phẩm</Link></div>
            </div>
        </div>
    )
}

function DetailRight({product}) {
    const cart = useSelector(state => state.cartReducer.cart)
    const likedCodes = useSelector(state => state.likedCodesReducer.liked)
    const dispatch = useDispatch()

    const inLiked = likedCodes.some(c => c.id === product.id)

    function handledDownload() {
        dispatch(addItemToCart(product))
    }

    return (
        <div className="detail-right">
            <div className="detail-right-offer">
                <h6>Giá sản Phẩm</h6>
                <span className="offer-price">{product.price === 0 ? 'FREE' : <>{formatNumber((product.price), '.')}<sup>đ</sup></>}</span>
                <button className="offer-download" onClick={handledDownload}>
                    {cart.some(item => item.id === product.id)
                        ? (<><i className="fa fa-check"></i> ĐÃ THÊM</>)
                        : (<><i className="fa fa-cart-shopping"></i> THÊM VÀO GIỎ HÀNG</>)}
                </button>
                <button className={`offer-favorite ${inLiked && 'offer-active'}`}
                        onClick={() => dispatch(addLiked(product))}><i className="fa fa-thumbs-up"></i> {inLiked ? 'Xóa khỏi' : 'Lưu vào'} yêu thích
                </button>
                <div className="d-flex justify-content-center">
                    <span><i className="fa fa-thumbs-up"></i> Like </span>
                    <span><i className="fa fa-share-alt"></i> Share</span>
                </div>
            </div>
        </div>
    )
}

function DetailDivider({title, refData}) {
    return (<div className="detail-divider mt-5" ref={refData}><span>{title}</span></div>)
}

function DetailDescription({product, goTo}) {
    return (
        <>
            <DetailDivider title={'MÔ TẢ CHI TIẾT'}/>
            <div className="detail-description">
                <div><pre> {product.description}</pre></div>
            </div>
        </>
    )
}

function DemoImage({product}) {
    return (
        <>
            <DetailDivider title={'HÌNH ẢNH DEMO'}/>
            <div className="text-center">
                {product.listImg.map((value, index) => {
                    return (
                        <div key={index}>
                            <img style={{display: 'inline-block', marginBottom: '15px'}} key={index} src={value.path_image} alt=""/>
                            <p className="text-center mt-0 mb-5 font-italic text-dark">Hình {index + 1}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}



function RatingModal({ product, setProduct, closeModal }) {
    const ratingCriteria = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt'];
    const [starIndex, setStarIndex] = useState(-1);
    const [feel, setFeel] = useState('');
    const [limit, setLimit] = useState(0);
    const [checkFeel, setCheckFeel] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false); // State để điều khiển hiển thị thông báo đăng nhập
    const starRef = useRef(-1);

    useEffect(() => {
        document.querySelectorAll('.rating-modal-stars > div').forEach(function (value) {
            value.addEventListener('mouseover', function () {
                setStarIndex(Number(this.getAttribute('aria-valuenow')));
            });
            value.addEventListener('mouseleave', function () {
                if (starRef.current !== Number(this.getAttribute('aria-valuenow'))) {
                    setStarIndex(-1);
                }
                if (starRef.current !== -1) {
                    setStarIndex(starRef.current);
                }
            });
        });
    }, [starIndex]);

    function onStarClicked(index) {
        setStarIndex(index);
        starRef.current = index;
    }

    function handleFeel(e) {
        const text = e.target.value;
        setFeel(text);
        setLimit(text.length);
        if (text.length >= 3) setCheckFeel(false);
    }

    function sendRating() {
        const email = localStorage.getItem("account");

        if (!email) {
            setShowLoginMessage(true); // Hiển thị thông báo yêu cầu đăng nhập
            return; // Không có email trong localStorage, không thực hiện gửi đánh giá
        }

        const data = {
            star: 5 - starRef.current,
            comment: feel,
            create_at: new Date().toISOString()
        };

        axios.post(`http://localhost:8080/api/ratings/${email}/product/${product.id}`, data)
            .then(response => {
                console.log('Rating created successfully:', response.data);
                setFeel('');
                setLimit(0);
                fetchCodes(`http://localhost:8080/api/products/${product.id}`).then(json => {
                    setProduct(json.data)
                    setProduct(product => ({...product, viewed: product.viewed}))
                })
                closeModal();
            })
            .catch(error => {
                console.error('Error creating rating:', error.response);
                // Xử lý lỗi nếu cần thiết
            });

    }

    return (
        <div className="rating-modal" onClick={closeModal}>
            <div className="rating-modal-content" onClick={(e) => e.stopPropagation()}>
                <div>
                    <span>Đánh giá</span>
                    <span onClick={closeModal}><i className="fa fa-x"></i></span>
                </div>
                <div>
                    <div className="rating-modal-stars my-4">
                        {ratingCriteria.map((value, index) => (
                            <div aria-valuenow={index} className={starIndex === index && 'bg-active'} key={index}
                                 onClick={() => onStarClicked(index)}>
                                <div className={`s${index}`}></div>
                                <div>{ratingCriteria[4 - index]}</div>
                            </div>
                        ))}
                    </div>
                    <div className="rating-content">
                        {showLoginMessage ? (
                            <div style={{ color: 'red', marginBottom: '10px' }}>Vui lòng đăng nhập để đánh giá sản phẩm.</div>
                        ) : null}
                        <span style={{ display: checkFeel ? 'inline-block' : 'none' }}>Nội dung tối thiểu 3 ký tự</span>
                        <span style={{ display: limit < 3 ? 'inline-block' : 'none' }}>{limit}/3</span>
                        <textarea style={{ borderColor: checkFeel ? '#e70a0a' : 'var(--color-border)' }}
                                  value={feel} onChange={handleFeel} placeholder="Mời bạn chia sẻ một số cảm nhận về sản phẩm..." />
                    </div>
                    <div className="text-center mt-3 mb-1">
                        <button onClick={sendRating}>Gửi đánh giá ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Rating({ product, setProduct }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <DetailDivider title={'ĐÁNH GIÁ'} />
            <div className="detail-rating">
                <div className="row mt-5 mb-3">
                    <div className="col-lg-4 text-center">
                        <div className="rating-average">{formatRating(product.rating).average}<span>/5</span></div>
                        <div className="product-item-stars">
                            <StarRate stars={formatRating(product.rating).average} type={"fa fa-star"} />
                        </div>
                        <div className="rating-count">{formatNumber(formatRating(product.rating).total, ',')} đánh giá</div>
                        <div className="rating-action mt-3 text-center">
                            <button onClick={() => setShowModal(true)}><i className="bi bi-star-fill mr-1"></i> Viết đánh giá</button>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="rating-chart">
                            {Array(5).fill(1).map((value, index) => (
                                <div key={index}>
                                    <div>{5 - index} <i className="bi bi-star-fill"></i></div>
                                    <div>
                                        <div style={{ width: `${formatRating(product.rating)['avg' + (5 - index)]}%` }}></div>
                                    </div>
                                    <div>{product.rating[(5 - index) + 'star']}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="detail-rating-comment">
                    {[...product['rating_comment']].sort((a, b) => a.when - b.when > 0 ? -1 : 1).map((rating, index) => (
                        <div key={index}>
                            <div>{rating.name} <span><i className="fa fa-check-circle"></i> Đã mua hàng</span>
                                <span>{getPassedTimeInText(rating.when)}</span></div>
                            <div className="product-item-stars">
                                <StarRate stars={rating.star} type={"bi bi-star-fill"} />
                            </div>
                            <div>{rating.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && <RatingModal product={product} setProduct={setProduct} closeModal={() => setShowModal(false)} />}
        </>
    );
}


function DetailContent({product, setProduct}) {
    const ref = useRef(null)
    const goToInstallation = () => ref.current.scrollIntoView({behavior: "auto"})
    return (
        <>
            <DetailDescription product={product} goTo={goToInstallation}/>
            <DemoImage product={product}/>
            <Rating product={product} setProduct={setProduct}/>

        </>
    )
}

export default function ProductDetails() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useMemo(() => {
        fetchCodes(`http://localhost:8080/api/products/${id}`).then(json => {
            setProduct(json.data)
            setProduct(product => ({...product, view: product.view + 1}))
            setLoading(false)
        })
    }, [id])
    console.log(product)
    useEffect(() => {
        putCodes(`http://localhost:8080/api/products/${product.id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }).then()
    }, [product])

    if (loading) return <div>Loading...</div>

    function breadcrumbs() {
        return [{name: 'Trang chủ', link: '/'}, {name: 'Danh sách sản phẩm', link: `/products`}, {
            name: 'Chi tiết sản phẩm',
            link: `/products/product/${product.id}`
        }, {name: `${product.name}`, link: `/products/product/${product.id}`}]
    }

    return (
        <>
            <SectionBreadcrumb breadcrumbs={breadcrumbs()}/>
            <section className="product-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-5">
                                    <DetailLeft product={product}/>
                                </div>
                                <div className="col-lg-7">
                                    <DetailCenter product={product}/>
                                </div>
                            </div>
                            <DetailContent product={product} setProduct={setProduct}/>
                        </div>
                        <div className="col-lg-3">
                            <DetailRight product={product}/>
                            <PopularCode/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}