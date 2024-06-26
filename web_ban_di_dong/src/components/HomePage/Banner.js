import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../css/slide.css'

import img_banner_1 from '../../img/banner/banner-1.jpg';
import img_banner_2 from '../../img/banner/banner-2.jpg';
import img_banner_3 from '../../img/banner/banner-3.jpg';
import {Link} from "react-router-dom";

function Banner() {

    // Định nghĩa thuộc tính của hình ảnh slide
    const styleImage = {
        // width: '80%',
        // height: '30%'
    }

    // Định nghĩa các thiết lập của carousel
    const carouselSettings = {
        showIndicators: false,
        showThumbs: false,
        showStatus: false,
        showArrows: true,
        autoPlay: true, // Tự động phát carousel
        interval: 5000,  // Thời gian giữa các lần chuyển đổi ảnh là 8 giây (8000 mili giây)
        infiniteLoop: true, // Cho phép lặp vô hạn carousel
        stopOnHover: true  // Dừng carousel khi con trỏ chuột nằm trên nó
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="banner-left list-group">
                            <Link to="/products?type=Samsung" className="list-group-item"><i className="fa fa-code"></i> Samsung</Link>
                            <Link to="/products?type=iPhone" className="list-group-item"><i className="fa fa-code"></i> iPhone</Link>
                            <Link to="/products?type=Oppo" className="list-group-item"><i className="fa fa-code"></i> OPPO</Link>
                            <Link to="/products?type=Xiaomi" className="list-group-item"><i className="fa fa-code"></i> Xiaomi</Link>
                            <Link to="/products?type=Vivo" className="list-group-item"><i className="fa fa-code"></i> Vivo</Link>
                            <Link to="/products?type=Realme" className="list-group-item"><i className="fa fa-code"></i> Realme</Link>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <Carousel className="main-slide" {...carouselSettings}>
                            <div>
                                <img style={styleImage} src={img_banner_1} alt=""/>
                            </div>
                            <div>
                                <img style={styleImage} src={img_banner_2} alt=""/>
                            </div>
                            <div>
                                <img style={styleImage} src={img_banner_3} alt=""/>
                            </div>
                        </Carousel>
                    </div>
                
                </div>
            </div>
        </>
    );

}

export default Banner;
