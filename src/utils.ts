import { Product } from "./types";

export const getDateWithHours= (hours = 0): Date=>{
    const now: Date = new Date();
    now.setHours(now.getHours()+hours);
    return now;
}

export const isProductsEqual =(obj1:Product,obj2:Product): boolean =>{
    return JSON.stringify(obj1) === JSON.stringify(obj2); 
} 

export const sortByTerm = (prodList:Product[],term:"name"|"creationDate")=>{
    return prodList.sort((a, b) => {
        const termA = a[term].toString().toUpperCase();
        const termB = b[term].toString().toUpperCase();
        if (termA < termB) {
          return -1;
        }
        if (termA > termB) {
          return 1;
        }
        return 0;
      });
}