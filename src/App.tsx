import { useState } from "react";
import "./App.css";
import { Product } from "./types";
import { productList } from "./mockData";
import ProductCard from "./components/productCard";
import EditView from "./components/editView";

function App() {
  const [products, setProducts] = useState<Product[]>(productList);
  const [prodInView, setProdInView] = useState<Product | null>(null);

  //-------//
  const onEditSubmit = (prodData: Product) => {
    console.log(prodData);
  };

  const handleProdDelete = (id: number) => {
    const newList = products.filter((prod) => prod.id !== id);
    setProducts(newList);
  };

  return (
    <>
      <div>
        {products.map((product) => (
          <div key={product.id} onClick={() => setProdInView(product)}>
            <ProductCard
              productData={product}
              onClickDeleteHandler={handleProdDelete}
            />
          </div>
        ))}
        <EditView data={prodInView} submitHandler={onEditSubmit} />
      </div>
    </>
  );
}

export default App;
