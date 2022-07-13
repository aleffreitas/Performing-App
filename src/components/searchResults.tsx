import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>

  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ results, onAddToWishlist }: SearchResultProps){

  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results])
 
  return(
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product =>{
        return(
          <ProductItem onAddToWishlist={onAddToWishlist} key={product.id} product={product} />
        );
      })}
    </div>
  );
}