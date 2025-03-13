import React, { FC, FormEvent, useEffect, useState } from "react";
import { Product } from "../../types";
import AppButton from "../appButton";
import prodImg from "../../assets/react.svg";
import { isProductsEqual } from "../../utils";

type EditViewProps = {
  data: Product | null;
  submitHandler: (data: Product) => void;
};

const EditView: FC<EditViewProps> = ({ data, submitHandler }) => {
  const [name, setName] = useState<string>(data?.name || "");
  const [description, setDescription] = useState<string>(
    data?.description || ""
  );
  const [price, setPrice] = useState<number | "">(data?.price || "");
  useEffect(() => {
    setName(data?.name || "");
    setDescription(data?.description || "");
    setPrice(data?.price || "");
  }, [data]);

  const newProd = {
    ...data,
    name,
    description,
    price,
  } as Product;

  const validateFormData = (): boolean => {
    let infoIsValid = true;
    if (name.length === 0) infoIsValid = false;
    if (Number(price) <= 0) infoIsValid = false;
    return infoIsValid;
  };

  const onSubmitHandle = (e: FormEvent) => {
    e.preventDefault();
    if (!isProductsEqual(newProd, data as Product) && !validateFormData())
      return;
    submitHandler({ ...newProd, creationDate: new Date() });
  };

  return (
    <div>
      <img src={prodImg} alt="product image" />
      <form onSubmit={onSubmitHandle}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder=" Enter Name"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            cols={30}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Add Description"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
        </div>
        <AppButton type="submit" disabled={!validateFormData()}>
          {data ? "Edit" : "Save"}
        </AppButton>
      </form>
    </div>
  );
};

export default EditView;
