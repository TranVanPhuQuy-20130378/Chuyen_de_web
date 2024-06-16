import React from "react";
import Header from "../Commons/Header";
import Footer from "../Commons/Footer";
import {ProductsContent} from "./Products";

function HighQualityProducts() {
    return <ProductsContent group={'quality'}/>
}

export default function SP_Hot() {
    return (
        <>
            <Header/>
            <HighQualityProducts/>
            <Footer/>
        </>
    )
}