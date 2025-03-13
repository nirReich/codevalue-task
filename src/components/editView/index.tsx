import React, { FC, FormEvent, useEffect, useState } from "react";
import { Product } from "../../types";
import AppButton from "../appButton";
import prodImg from "../../assets/react.svg";
import { isProductsEqual } from "../../utils";
import classes from "./editView.module.css";

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
    <div className={classes.container}>
      <fieldset className={classes.fieldsetContainer}>
        <legend>{data ? `${data.name} Details` : "New Product Details"}</legend>

        <img src={prodImg} alt="product image" width={50} />
        <form onSubmit={onSubmitHandle}>
          <div className={classes.inputSection}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder=" Enter Name"
            />
          </div>
          <div className={classes.inputSection}>
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
          <div className={classes.inputSection}>
            <label htmlFor="price">Price</label>
            <input
              className={classes.priceInput}
              type="number"
              id="price"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
          </div>
          <AppButton className={classes.editButton} type="submit" disabled={!validateFormData()}>
            {data ? "Edit" : "Save"}
          </AppButton>
        </form>
      </fieldset>
    </div>
  );
};

export default EditView;
