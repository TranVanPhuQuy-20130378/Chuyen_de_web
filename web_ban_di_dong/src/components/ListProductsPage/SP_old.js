import React from "react";
import Header from "../Commons/Header";
import Footer from "../Commons/Footer";
import {ProductsContent} from "./Products";

function FreeProducts() {
    return <ProductsContent group={'free'}/>
}

export default function SP_old() {
    return (
        <>
            <Header/>
            <FreeProducts/>
            <Footer/>
        </>
    )
}