// import { Minus, Plus, Trash } from "lucide-react";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCartItem, updateCartQuantity } from "../../store/shop/cart-Slice";
// import { toast } from "sonner";

// function UserCartItemsContent({ cartItem }) {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productList } = useSelector((state) => state.shopProducts);
//   const dispatch = useDispatch();

//   function handleUpdateQuantity(getCartItem, typeOfAction) {
//     if (typeOfAction == "plus") {
//       let getCartItems = cartItems.items || [];

//       if (getCartItems.length) {
//         const indexOfCurrentCartItem = getCartItems.findIndex(
//           (item) => item.productId === getCartItem?.productId
//         );

//         const getCurrentProductIndex = productList.findIndex(
//           (product) => product._id === getCartItem?.productId
//         );
//         const getTotalStock = productList[getCurrentProductIndex].totalStock;

//         console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

//         if (indexOfCurrentCartItem > -1) {
//           const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
//           if (getQuantity + 1 > getTotalStock) {
//             toast({
//               title: `Only ${getQuantity} quantity can be added for this item`,
//               variant: "destructive",
//             });

//             return;
//           }
//         }
//       }
//     }

//     dispatch(
//       updateCartQuantity({
//         userId: user?.id,
//         productId: getCartItem?.productId,
//         quantity:
//           typeOfAction === "plus"
//             ? getCartItem?.quantity + 1
//             : getCartItem?.quantity - 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast(
//            "Cart item is updated successfully",
//         );
//       }
//     });
//   }

//   function handleCartItemDelete(getCartItem) {
//     dispatch(
//       deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast(
//          "Cart item is deleted successfully",
//         );
//       }
//     });
//   }
//   return (
//     <div className="flex items-center space-x-4">
//       <img
//         src={cartItem?.productId.image}
//         alt={cartItem?.productId.title}
//         className="w-20 h-20 rounded object-cover"
//       />
      
//       <div className="flex-1">
//         <h3 className="font-extrabold">{cartItem?.productId.title}</h3>
//         <div className="flex items-center gap-2 mt-1">
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             disabled={cartItem?.productId?.quantity === 1}
//             onClick={() => handleUpdateQuantity(cartItem.productId, "minus")}
//           >
//             <Minus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//           <span className="font-semibold">{cartItem?.quantity}</span>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             onClick={() => handleUpdateQuantity(cartItem, "plus")}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-end">
//         <p className="font-semibold">
//           $
//           {(
//             (cartItem?.productId?.salePrice > 0 ? cartItem?.productId?.salePrice : cartItem?.productId?.price) *
//             cartItem?.productId?.quantity
//           ).toFixed(2)}
//         </p>
//         <Trash
//           onClick={() => handleCartItemDelete(cartItem?.productId)}
//           className="cursor-pointer mt-1"
//           size={20}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserCartItemsContent;

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "../../store/shop/cart-Slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      const getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId._id === getCartItem?.productId._id
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId._id
        );

        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const currentQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (currentQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${currentQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId._id,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is updated successfully");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is deleted successfully");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.productId?.image}
        alt={cartItem?.productId?.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.productId?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.productId?.salePrice > 0
              ? cartItem?.productId?.salePrice
              : cartItem?.productId?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

