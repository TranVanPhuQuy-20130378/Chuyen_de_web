import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Sale from "../components/ListProductsPage/sale";
import ProductDetails from "../components/ProductDetailPage/ProductDetails";
import LoginPage from "../components/AuthenticationPage/Login";
import RegisterPage from "../components/AuthenticationPage/Register";
import ForgotPassPage from "../components/AuthenticationPage/ForgotPass";
import ProfilePage from "../components/ProfilePage/Profile";
import ChangePassPage from "../components/AuthenticationPage/ChangePass";
import CartDetailPage from "../components/CartDetailPage/CartDetailPage";
import { LikedCodes } from "../components/Commons/LikedCodes";
import { ErrorPage404 } from "../components/ErrorPage/ErrorPage404";
import VerifyPassPage from "../components/AuthenticationPage/VerifyPass";
import SP_old from "../components/ListProductsPage/SP_old";
import SP_Hot from "../components/ListProductsPage/SP_Hot";

import Products, { ProductsContent } from "../components/ListProductsPage/Products";
import HistoryCart from "../components/ProfilePage/HistoryCart";
import OrderDetail from "../components/ProfilePage/OrderDetail";

const profile = { path: '/profile', element: <ProfilePage /> };
const listAuthentication = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassPage />
    },
    {
        path: '/change-password',
        element: <ChangePassPage />
    },
    {
        path: "/verify-password",
        element: <VerifyPassPage />
    }
];

const listProducts = [
    {
        path: '/products',
        element: <Products />,
        children: [
            {
                index: true,
                element: <ProductsContent />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            }
        ]
    },
    {
        path: '/sale',
        element: <Sale />
    },
    {
        path: '/hot',
        element: <SP_Hot />
    },
    {
        path: '/old',
        element: <SP_old />
    }
];

const likedCodes = [{
    path: '/liked-codes',
    element: <LikedCodes />
}];

const cart = [{
    path: '/cart-details',
    element: <CartDetailPage />
}];

const historyCart = [{
    path: '/historyCart',
    element: <HistoryCart />
}];

const orderDetails = [{
    path: '/order-details/:orderId',
    element: <OrderDetail />
}];

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage404 />
    },
    profile,
    ...listProducts,
    ...listAuthentication,
    ...cart,
    ...likedCodes,
    ...historyCart,
    ...orderDetails // Thêm orderDetails vào trong danh sách router
]);
