import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types";
import { productList } from "../../mockData";
import ProductCard from "../../components/productCard";
import EditView from "../../components/editView";
import AppButton from "../../components/appButton";
import SortBox from "../../components/sortBox";
import { sortByTerm } from "../../utils";

function HomePage() {
  const [products, setProducts] = useState<Product[]>(productList);
  const [productListToShow, setProductListToShow] =
    useState<Product[]>(products);
  const [prodInView, setProdInView] = useState<Product | null>(null);
  const [sortTerm, setSortTerm] = useState<"name" | "creationDate">("name");
  const [searchTerm, setSearchTerm] = useState("");

  //-------//

  const filterProducts = useCallback(
    (term: string) => {
      if (term) {
        const newList = products.filter((prod) => prod.name.includes(term));
        setProductListToShow(newList);
      } else {
        setProductListToShow(products);
      }
    },
    [products]
  );

  useEffect(() => {
    filterProducts(searchTerm);
  }, [filterProducts, searchTerm]);

  useEffect(() => {
    const newList = sortByTerm(productListToShow, sortTerm);
    setProductListToShow(newList);
  }, [productListToShow, sortTerm]);

  const handleEditProduct = (prodData: Product) => {
    const newProdList = products.map((prod) =>
      prod.id == prodData.id ? prodData : prod
    );
    setProducts(newProdList);
    setProdInView(null);
  };

  const handleAddProduct = (prodData: Product) => {
    const newProduct: Product = { ...prodData, id: products.length };
    setProducts([...products, newProduct]);
    setProdInView(null);
  };

  const handleProdDelete = (id: number) => {
    const newList = products.filter((prod) => prod.id !== id);
    setProducts(newList);
  };

  return (
    <div>
      <AppButton onClick={() => setProdInView(null)}>Add +</AppButton>
      <SortBox sortTermSetter={setSortTerm} searchTermSetter={setSearchTerm} />
      {productListToShow.map((product) => (
        <div key={product.id} onClick={() => setProdInView(product)}>
          <ProductCard
            productData={product}
            onClickDeleteHandler={handleProdDelete}
          />
        </div>
      ))}
      <EditView
        data={prodInView}
        submitHandler={prodInView ? handleEditProduct : handleAddProduct}
      />
    </div>
  );
}

export default HomePage;
