import { Product } from "./types";
import { getDateWithHours } from "./utils";


export const productList: Product[] = [
    {
        id:0,
        name:'product 1',
        description: 'product 1 description',
        price:100,
        creationDate: getDateWithHours()
    },
    {
        id:1,
        name:'product 2',
        description: 'product 2 description',
        price:200,
        creationDate: getDateWithHours(1)
    },
    {
        id:2,
        name:'product 3',
        description: 'product 3 description',
        price:300,
        creationDate: getDateWithHours(2)
    },
]