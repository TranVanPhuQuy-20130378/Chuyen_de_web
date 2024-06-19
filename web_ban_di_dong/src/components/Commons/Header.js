import '../../css/header.css'
import {useEffect, useState} from "react";
import Cart from './Cart'
import {Link, useLocation, useNavigate} from "react-router-dom";
import $ from 'jquery'
import {getTypes,makeURL} from "../../javascript/utils"
import {useDispatch} from "react-redux";
import {setLayout, setPage, setSort, setType} from "../../redux/Action";



function HeaderTop() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('account');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    const handleLogout = () => {
        // Xử lý đăng xuất
        localStorage.removeItem('account');
        setEmail('');
    };
    return (
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 py-2">
                        <div className="header-top-left d-flex justify-content-start align-items-center">
                            <a href="tel:0123.456.789"><i className="fa afa-phone-alt"></i> 0123.456.789</a>
                            <a href="mailto:k46-it-nlu@gmail.com"><i className="fa fa-envelope"></i> k46-it-nlu@gmail.com</a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 py-2">
                        <div className="header-top-right d-flex justify-content-end align-items-center">
                            <div className="header-top-right-social d-flex justify-content-start align-items-center">
                                <a target="_blank" rel="noreferrer" href="https://facebook.com"><i className="fa fa-facebook"></i></a>
                                <a target="_blank" rel="noreferrer" href="https://twitter.com"><i className="fa fa-twitter"></i></a>
                                <a target="_blank" rel="noreferrer" href="https://linkedin.com"><i className="fa fa-linkedin"></i></a>
                                <a target="_blank" rel="noreferrer" href="https://youtube.com"><i className="fa fa-youtube-play"></i></a>
                            </div>
                            <div className="header-top-right-language">
                                <img src={require('../../img/language/tieng_viet.png')} alt="" className="mr-2"/>
                                <div>Tiếng Việt <i className="bi bi-chevron-down d-inline-block ml-2"></i></div>
                                <ul>
                                    <li>Tiếng Việt</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {email ? (
                                <div className="header-top-right-auth d-flex justify-content-end align-items-center">
                                    <Link to="/profile"><i className="fa fa-user-plus"></i>Xin chào</Link>
                                    <Link to="/" onClick={handleLogout} className="mr-0"><i className="fa fa-sign-in"></i> Đăng xuất</Link>
                                </div>
                            ) : (
                                <div className="header-top-right-auth d-flex justify-content-end align-items-center">
                                    <Link to="/register"><i className="fa fa-user-plus"></i> Đăng ký</Link>
                                    <Link to="/login" className="mr-0"><i className="fa fa-sign-in"></i> Đăng nhập</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HeaderMenu() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    function handledLink(link) {
        dispatch(setPage(1))
        dispatch(setSort(null))
        dispatch(setLayout('grid'))
        navigate(link)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-2 d-flex justify-content-center align-items-center">
                    <div className="py-4">
                        <Link to={'/'}><img src={require('../../img/logo/logo.png')} alt=""/></Link>
                    </div>
                </div>
                <div className="col-lg-8 d-flex justify-content-center align-items-center">
                    <nav className="header-menu">
                        <ul>
                            <li><span onClick={() => handledLink('/')} className={location.pathname === '/' && 'active'}>Trang chủ</span></li>
                            <li><span onClick={() => handledLink('/sale')}
                                      className={location.pathname.indexOf('sale') > 0 && 'active'}>Sale</span></li>
                            <li><span onClick={() => handledLink('/hot')}
                                      className={location.pathname.indexOf('hot') > 0 && 'active'}>Điện thoại hot</span>
                                <img src={require('../../img/ic_hot.gif')} alt=""/>
                            </li>
                            <li><span onClick={() => handledLink('/old')}
                                      className={location.pathname.indexOf('old') > 0 && 'active'}>Điện thoại cũ</span></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-lg-2 d-flex justify-content-center align-items-center">
                    <Cart/>
                </div>
            </div>
        </div>
    )
}

function CodeCategories({types}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleNavigation(typeId) {
        dispatch(setType(typeId))
        dispatch(setPage(1))
        dispatch(setSort(null))
        navigate(`/products?type=${typeId}`)
    }

    return (
        <div className="header-categories" onClick={() => {
            $('.header-categories ul').slideToggle(300)
            $('.header-categories-all .bi-chevron-down').toggleClass('rotate-down')
        }}>
            <div className="header-categories-all">
                <i className="bi bi-list mr-3"></i>
                <span>Hãng</span>
                <i className="bi bi-chevron-down"></i>
            </div>
            <ul>
                {types.map(type => (
                    <li onClick={() => handleNavigation(type.id)}
                        className="list-group-item" key={type.id}><i className="fa fa-code"></i> {type.name}</li>
                ))}
            </ul>
        </div>
    )
}

// function HeaderSearch() {
//     const location = useLocation()
//     const [search, setSearch] = useState({
//         query: new URLSearchParams(location.search).get('search'),
//         from: new URLSearchParams(location.search).get('from')
//     })
//     const [types, setTypes] = useState([])
//     const [toggle, setToggle] = useState(false)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     useEffect(() => {
//         fetch(`http://localhost:8080/api/products`)
//             .then(res => res.json())
//             .then(json => setTypes(getTypes(json)))
//     }, [])

//     function handleChange(event) {
//         setSearch({...search, query: event.target.value})
//     }

//     function handleSubmit(event) {
//         event.preventDefault()
//         dispatch(setPage(1))
//         dispatch(setSort(null))
//         dispatch(setLayout('grid'))
//         navigate(`/products?search=${search.query}${search.from ? `&from=${search.from}` : ''}`)
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-lg-3">
//                     <CodeCategories types={types}/>
//                 </div>
//                 <div className="col-lg-8">
//                     <div className="header-search h-100">
//                         <form onSubmit={handleSubmit}>
//                             <div className="header-search-categories pl-3"
//                                  onClick={(e) => {
//                                      e.stopPropagation()
//                                      $('.header-search-categories ul').slideToggle(300)
//                                      setToggle(!toggle)
//                                  }}>
//                                 <span className="position-relative align-middle">{search.from ? getTypeName(search.from) : 'TẤT CẢ HÃNG'} <i
//                                     className={toggle ? "fa fa-caret-up" : "fa fa-caret-down"}></i></span>
//                                 <ul>
//                                     {types.map(type => (
//                                         <li onClick={() => setSearch({...search, from: type.id})}
//                                             key={type.id}>{type.name}</li>
//                                     ))}
//                                     <li onClick={() => setSearch({})} key={types.length}>Hãng</li>
//                                 </ul>
//                             </div>
//                             <input type="text" value={search.query} placeholder="Nhập từ khóa" onChange={handleChange}/>
//                             <button type="submit"><i className="fa fa-search"></i></button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// function HeaderSearch() {
//     const location = useLocation();
//     const [search, setSearch] = useState({
//         query: new URLSearchParams(location.search).get('search'),
//         from: new URLSearchParams(location.search).get('from')
//     });
//     const [types, setTypes] = useState([]);
//     const [toggle, setToggle] = useState(false);
//     const [suggestions, setSuggestions] = useState([]);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`http://localhost:8080/api/products`)
//             .then(res => res.json())
//             .then(json => setTypes(getTypes(json)));
//     }, []);

//     useEffect(() => {
//         const debounceTimeout = setTimeout(() => {
//             if (search.query) {
//                 fetch(`http://localhost:8080/api/products/suggestions?query=${search.query}`)
//                     .then(res => res.json())
//                     .then(json => setSuggestions(json));
//             } else {
//                 setSuggestions([]);
//             }
//         }, 300);

//         return () => clearTimeout(debounceTimeout);
//     }, [search.query]);

//     function handleChange(event) {
//         setSearch({ ...search, query: event.target.value });
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         dispatch(setPage(1));
//         dispatch(setSort(null));
//         dispatch(setLayout('grid'));
//         navigate(`/products?search=${search.query}${search.from ? `&from=${search.from}` : ''}`);
//         setSuggestions([]);
//     }

//     function handleSuggestionClick(suggestion) {
//         setSearch({ ...search, query: suggestion });
//         setSuggestions([]);
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-lg-3">
//                     <CodeCategories types={types} />
//                 </div>
//                 <div className="col-lg-8">
//                     <div className="header-search h-100">
//                         <form onSubmit={handleSubmit}>
//                             <div className="header-search-categories pl-3"
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     $('.header-search-categories ul').slideToggle(300);
//                                     setToggle(!toggle);
//                                 }}>
//                                 <span className="position-relative align-middle">{search.from ? getTypeName(search.from) : 'TẤT CẢ HÃNG'} <i
//                                     className={toggle ? "fa fa-caret-up" : "fa fa-caret-down"}></i></span>
//                                 <ul>
//                                     {types.map(type => (
//                                         <li onClick={() => setSearch({ ...search, from: type.id })}
//                                             key={type.id}>{type.name}</li>
//                                     ))}
//                                     <li onClick={() => setSearch({})} key={types.length}>Hãng</li>
//                                 </ul>
//                             </div>
//                             <input
//                                 type="text"
//                                 value={search.query}
//                                 placeholder="Nhập từ khóa"
//                                 onChange={handleChange}
//                             />
//                             <button type="submit"><i className="fa fa-search"></i></button>
//                         </form>
//                         {suggestions.length > 0 && (
//                             <ul className="suggestions-list">
//                                 {suggestions.map((suggestion, index) => (
//                                     <li
//                                         key={index}
//                                         onClick={() => handleSuggestionClick(suggestion)}
//                                     >
//                                         {suggestion}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export function HeaderSearch() {
    const location = useLocation();
    const [search, setSearch] = useState({
        query: new URLSearchParams(location.search).get('search') || '',
        from: new URLSearchParams(location.search).get('from') || ''
    });
    const [types, setTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/products`)
            .then(res => res.json())
            .then(json => {
                setTypes(getTypes(json));
                setProducts(json.data); // Lưu danh sách sản phẩm vào state
            })
            .catch(error => console.error('Lỗi khi lấy danh sách sản phẩm:', error));
    }, []);

    useEffect(() => {
        if (search.query) {
            setFilteredProducts(products.filter(product =>
                product.name.toLowerCase().includes(search.query.toLowerCase())
            ));
        } else {
            setFilteredProducts([]);
        }
    }, [search.query, products]);

    function handleChange(event) {
        setSearch({ ...search, query: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const url = makeURL(search.query, search.from, 1, null); // Thêm page và sort
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setFilteredProducts(json.data); // Cập nhật danh sách sản phẩm đã tìm kiếm
                navigate(`/products?search=${search.query}${search.from ? `&from=${search.from}` : ''}`);
                dispatch(setPage(1));
                dispatch(setSort(null));
                dispatch(setLayout('grid'));
            })
            .catch(error => console.error('Lỗi khi tìm kiếm sản phẩm:', error));
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <CodeCategories types={types} />
                </div>
                <div className="col-lg-8">
                    <div className="header-search h-100">
                        <form onSubmit={handleSubmit}>
                            <div className="header-search-categories pl-3"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    $('.header-search-categories ul').slideToggle(300);
                                    setToggle(!toggle);
                                }}>
                                <span className="position-relative align-middle">
                                    {search.from || 'TẤT CẢ HÃNG'}
                                    <i className={toggle ? "fa fa-caret-up" : "fa fa-caret-down"}></i>
                                </span>
                                <ul>
                                    {types.map(type => (
                                        <li onClick={() => setSearch({ ...search, from: type.name })}
                                            key={type.name}>{type.name}</li>
                                    ))}
                                    <li onClick={() => setSearch({ query: search.query, from: '' })} key="all">TẤT CẢ HÃNG</li>
                                </ul>
                            </div>
                            <input
                                type="text"
                                value={search.query}
                                placeholder="Nhập từ khóa"
                                onChange={handleChange}
                                onFocus={() => setToggle(true)} // Hiển thị danh sách gợi ý khi input được focus
                                onBlur={() => setTimeout(() => setToggle(false), 200)} // Ẩn danh sách gợi ý khi input mất focus
                            />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </form>
                        {toggle && (
                            <div className="search-results" style={{ position: 'absolute', backgroundColor: 'white', zIndex: 1, width: '100%', maxHeight: '200px', overflowY: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map(product => (
                                            <li key={product.id} style={{ padding: '8px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                                                onClick={() => {
                                                    setSearch({ ...search, query: product.name }); // Chọn kết quả tìm kiếm để hiển thị vào input
                                                    setToggle(false); // Đóng danh sách kết quả
                                                }}>
                                                {product.name}
                                            </li>
                                        ))
                                    ) : (
                                        <li style={{ padding: '8px' }}>Không có kết quả phù hợp</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function Header() {
    useEffect(() => {
        const ul = $('.header-search-categories ul')
        $(document).on('click', (e) => {
            if (!ul.is(':hidden')) {
                ul.slideUp('fast')
            }
            e.stopPropagation()
        })
    }, [])

    return (
        <header className="header mb-3">
            <HeaderTop/>
            <HeaderMenu/>
            <HeaderSearch/>
        </header>
    )
}