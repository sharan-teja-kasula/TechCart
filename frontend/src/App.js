import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  </Router>
);

export default App;
