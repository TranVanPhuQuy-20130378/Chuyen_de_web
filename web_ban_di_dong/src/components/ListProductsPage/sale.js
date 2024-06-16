import {ProductsContent} from "./Products";
import Header from "../Commons/Header";
import Footer from "../Commons/Footer";

function TopProducts() {
    return <ProductsContent/>
}

export default function Sale() {
    return (
        <>
            <Header/>
            <TopProducts/>
            <Footer/>
        </>
    )
}