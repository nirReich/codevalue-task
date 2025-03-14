import React, { FC } from "react";
import classes from './sortBox.module.css'

type SortBoxProps = {
  sortTermSetter: (term: "name"|"creationDate") => void;
  searchTermSetter: (term: string) => void;
};

const SortBox: FC<SortBoxProps> = ({ sortTermSetter, searchTermSetter }) => {
  return (
    <div className={classes.container}>
      <input
        type="text"
        onChange={(e) => searchTermSetter(e.target.value)}
        placeholder="Search"
      />
      <select defaultValue={"name"} onChange={(e) => sortTermSetter(e.target.value as "name"|"creationDate")}>
        <option value="name">Name</option>
        <option value="creationDate">Recently Added</option>
      </select>
    </div>
  );
};

export default SortBox;
