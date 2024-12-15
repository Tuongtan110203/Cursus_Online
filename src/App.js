import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { Fragment } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BookmarkProvider } from "~/pages/BookMark/BookmarkContext";
import { CartProvider } from "~/Context/CartContext/CartContext";
import { UserProvider } from "~/Context/UserContext/UserContext";

import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho react-toastify

function App() {
  const clientId =
    "614661063333-ieppr4pa79m6fqgfa8uon4jl60f49c84.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BookmarkProvider>
        <CartProvider>
          <UserProvider>
            <Router>
              <div className="App">
                <ToastContainer />
                <Routes>
                  {publicRoutes.map((route, index) => {
                    const Layout = route.layout || Fragment;
                    const Page = route.component;
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          <Layout>
                            <Page />
                          </Layout>
                        }
                      />
                    );
                  })}
                </Routes>
              </div>
            </Router>
          </UserProvider>
        </CartProvider>
      </BookmarkProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
