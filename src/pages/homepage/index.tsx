import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types";
import { productList } from "../../mockData";
import ProductCard from "../../components/productCard";
import EditView from "../../components/editView";
import AppButton from "../../components/appButton";
import SortBox from "../../components/sortBox";
import {
  getListFromLocalstorage,
  saveListToLocalstorage,
  sortByTerm,
} from "../../utils";
import classes from "./hompage.module.css";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productListToShow, setProductListToShow] =
    useState<Product[]>(products);
  const [prodInView, setProdInView] = useState<Product | null>(null);
  const [sortTerm, setSortTerm] = useState<"name" | "creationDate">("name");
  const [searchTerm, setSearchTerm] = useState("");

  //initial save to L.S//
  useEffect(() => {
    const list = getListFromLocalstorage();
    if (!list && productList?.length > 0) {
      saveListToLocalstorage(productList);
    }
  }, []);

  useEffect(() => {
    const list = getListFromLocalstorage();
    if (list) {
      setProducts(list);
    }
  }, []);

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
    saveListToLocalstorage(newProdList)
    setProdInView(null);
  };

  const handleAddProduct = (prodData: Product) => {
    const newProduct: Product = { ...prodData, id: Date.now() };
    setProducts([...products, newProduct]);
    saveListToLocalstorage([...products, newProduct])
    setProdInView(null);
  };

  const handleProdDelete = (id: number) => {
    const newList = products.filter((prod) => prod.id !== id);
    saveListToLocalstorage(newList)
    setProducts(newList);
  };

  return (
    <div className={classes.container}>
      <div className={classes.listSection}>
        <div className={classes.topInputsContainer}>
          <AppButton onClick={() => setProdInView(null)}>Add +</AppButton>
          <SortBox
            sortTermSetter={setSortTerm}
            searchTermSetter={setSearchTerm}
          />
        </div>
        <div className={classes.itemsContainer}>
          {productListToShow.map((product) => (
            <div key={product.id} onClick={() => setProdInView(product)}>
              <ProductCard
                productData={product}
                onClickDeleteHandler={handleProdDelete}
              />
            </div>
          ))}
        </div>
      </div>
      <EditView
        data={prodInView}
        submitHandler={prodInView ? handleEditProduct : handleAddProduct}
      />
    </div>
  );
}

export default HomePage;
