import dynamic from "next/dynamic";
import { memo, useState } from "react";
// import { AddProductToWishList } from "./AddProductToWishlist";
import { AddProductToWishListProps } from '././AddProductToWishlist';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishList);
}, {
  loading: () => <span>Carregando...</span>
})
interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps){
  const [ isAddingToWishList, setIsAddingToWishlist ] = useState(false);

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      {/* <button onClick={() => onAddToWishlist(product.id)} >Add to wishlist</button> */}

      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
      { isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});