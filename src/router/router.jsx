import React, {Suspense} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { OverlayLoader } from "../components/loader";
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs";


// LAYOUTS
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";
// LAYOUTS

// AUTH
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import LoginPage from "../modules/auth/pages/LoginPage";
// AUTH

// 404
import NotFoundPage from  "../modules/auth/pages/NotFoundPage";
// 404

// PAGES
import CategoryPage from "../modules/category/pages/CategoryPage.jsx";
import ProductsPage from "../modules/products/pages/ProductsPage.jsx";
import UsersPage from "../modules/users/pages/UsersPage.jsx";
import MarketsPage from "../modules/market/pages/MarkestPage.jsx";
import TranslationPage from "../modules/translation/pages/TranslationPage.jsx";
import OrderPage from "../modules/order/pages/OrderPage.jsx";
// PAGES


const Router = ({ ...rest }) => {
dayjs.extend(utc)
  return (
    <BrowserRouter>
      <Suspense fallback={<OverlayLoader />}>
        <IsAuth>
          <Routes>
            <Route path={"/"} element={<DashboardLayout />}>
              <Route
                  path={"/category"}
                  index
                  element={<CategoryPage />}
              />
              <Route
                  path={"/products"}
                  element={<ProductsPage />}
              />
              <Route
                  path={"/markets"}
                  element={<MarketsPage />}
              />
              <Route
                  path={"/users"}
                  element={<UsersPage />}
              />
              <Route
                  path={"/translations"}
                  element={<TranslationPage />}
              />
              <Route
                  path={"auth/*"}
                  element={<Navigate to={"/category"} replace />}
              />
              <Route
                  path={"/"}
                  element={<Navigate to={"/category"} replace />}
              />
              <Route path={"*"} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route path={"/auth"} element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path={"/order/:id"}  index element={<OrderPage />} />
            <Route path={"*"} element={<Navigate to={"/auth"} replace />} />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
