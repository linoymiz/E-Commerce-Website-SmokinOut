import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PageNotFound } from "./pages/PageNotFound";
import { Products } from "./pages/products/Products";
import "./App.css";

export const App = () => {
    return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="products" element={<Products />}>
              {/* <Route
                path=":id"
                element={<ProductDetailsPage />}
              /> */}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      );
}