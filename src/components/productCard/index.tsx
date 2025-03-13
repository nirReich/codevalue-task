import React, { FC } from "react";
import { Product } from "../../types";
import prodImg from "../../assets/react.svg";
import classes from "./productCard.module.css";
import AppButton from "../appButton";

type ProductCardProps = {
  productData: Product;
  onClickDeleteHandler: (id: number) => void;
};

const ProductCard: FC<ProductCardProps> = ({
  productData,
  onClickDeleteHandler,
}) => {
  const { id, name, description } = productData;

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClickDeleteHandler(id);
  };

  return (
    <div className={classes.container}>
      <img src={prodImg} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>

      <AppButton className={classes.cardButton} onClick={handleDeleteClick}>
        Delete
      </AppButton>
    </div>
  );
};

export default ProductCard;
