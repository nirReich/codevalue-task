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

export const saveListToLocalstorage = (prodList: Product[])=>{
  try {
    const listSerialized:string = JSON.stringify(prodList)
    localStorage.setItem('productsList', listSerialized);
  } catch (error) {
    console.error(`Error at saveListToLocalstorage: ${error}`)
  }
}

export const getListFromLocalstorage = (): Product[] | void=>{
  try {
    const serializedList = localStorage.getItem('productsList');
    if(!serializedList) return;
    return JSON.parse(serializedList)
  } catch (error) {
    console.error(`Error at getListFromLocalstorage: ${error}`)
  }
}