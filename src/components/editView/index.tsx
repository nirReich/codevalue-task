import React, { FC, FormEvent, useEffect, useState } from "react";
import { Product } from "../../types";
import AppButton from "../appButton";
import prodImg from "../../assets/react.svg";

type EditViewProps = {
  data: Product | null;
  submitHandler: (data: Product) => void;
};

const EditView: FC<EditViewProps> = ({ data, submitHandler }) => {
  const [name, setName] = useState<string>(data?.name || "");
  const [description, setDescription] = useState<string>(
    data?.description || ""
  );
  const [price, setPrice] = useState<number>(data?.price || 0);
  useEffect(()=>{
    setName(data?.name||'');
    setDescription(data?.description||'');
    setPrice(data?.price||0)
  }, [data])

  const onSubmitHandle = (e: FormEvent) => {
    e.preventDefault();
    submitHandler({
      ...data,
      name,
      description,
      price,
    } as Product);
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
        <AppButton type="submit">Save</AppButton>
      </form>
    </div>
  );
};

export default EditView;
