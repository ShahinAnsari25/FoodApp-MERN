import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxSlices/CartItems";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const FoodCard = ({ data }) => {
  const cartItems = useSelector((state) => state.cartItem);
  const dispatch = useDispatch();

  const { itemName, categoryName, id, description, image, options } = data;
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        name: itemName,
        image: image,
        quantity: quantity,
        price: price,
        unitPrice: price / quantity,
        id: id,
      })
    );
  };

  const initialKey = Object.keys(options[0])[0];
  const initialValue = options[0][initialKey];
  const [qty, setQty] = useState(initialKey);
  const [price, setPrice] = useState(initialValue);
  const [quantity, setQuantity] = useState(1);
  const handleChange = (event) => {
    console.log(event.target.value);
    setPrice(options[0][event.target.value] * quantity);
    setQty(event.target.value);
  };
  const handleQuantity = (event) => {
    const value = event.target.value;
    setQuantity(value);
    setPrice(options[0][qty] * value);
  };

  //animation
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the component is in view
  });

  // Trigger the animation when the component comes into view
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Define animation variants
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <div
        class="card"
        style={{
          width: "19rem",
          border: "none",
        }}
      >
        <img
          src={image}
          class="card-img-top"
          alt="..."
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div class="card-body">
          <h5>{itemName}</h5>
          <p
            class="card-text"
            style={{
              fontSize: "14px",
            }}
          >
            {description}
          </p>
          <div
            className="numQtyContainer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "fit-content",
            }}
          >
            <div
              className="unitQtyContainer"
              style={{
                width: "40%",
              }}
            >
              <input
                type="number"
                min={1}
                style={{
                  width: "100%",
                  height: "35px",
                }}
                defaultValue={1}
                value={quantity}
                onChange={handleQuantity}
              />
            </div>

            <div
              className="qtyContainer"
              style={{
                width: "40%",
                // height: "30px",
              }}
            >
              <Select
                value={qty}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{
                  height: "35px",
                  width: "100%",
                }}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {Object.keys(options[0]).map((key, index) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="priceConatiner">
              <span
                style={{
                  fontSize: "18px",
                }}
              >
                {price}/-
              </span>
            </div>
          </div>
          <Button
            variant="contained"
            style={{
              marginTop: "10px",
            }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
export default FoodCard;
