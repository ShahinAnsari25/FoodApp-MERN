import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteFromCart, updateQuantity } from "../ReduxSlices/CartItems";
import { updateSum } from "../ReduxSlices/SumSlice";
const CartFood = ({ data }) => {
  const sum = useSelector((state) => state.sum.value);
  const { name, image, unitPrice, id, quantity } = data;
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const handleQuantity = (event) => {
    if (event.target.value > updatedQuantity) {
      handleQuantityChange(quantity + 1);
    } else {
      handleQuantityChange(quantity - 1);
    }
    setUpdatedQuantity(event.target.value);
  };
  const cartItem = useSelector((state) => state.cartItem);
  console.log(cartItem);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFromCart({ id: id }));
    console.log(cartItem);
  };
  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  return (
    <>
      <div
        className="cartFood"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "10px",
        }}
      >
        <img
          src={image}
          alt=""
          style={{
            height: "40px",
            width: "40px",
            border: "1px solid black",
            borderRadius: "50%",
          }}
        />
        <p
          style={{
            margin: "0px",
            width: "35%",
            fontWeight: "bold",
          }}
        >
          {name}
        </p>
        <input
          type="number"
          min={1}
          defaultValue={updatedQuantity}
          style={{
            width: "20%",
          }}
          onChange={handleQuantity}
        />
        <p
          style={{
            margin: "0px",
            width: "15%",
            fontWeight: "bold",
          }}
        >
          {updatedQuantity * unitPrice}
        </p>
        <span
          style={{
            marginBottom: "7px",
          }}
          onClick={handleDelete}
        >
          <svg
            style={{
              height: "17px",
              width: "17px",
              fill: "red",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </span>
      </div>
    </>
  );
};
export default CartFood;
