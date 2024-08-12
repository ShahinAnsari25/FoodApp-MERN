import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../ReduxSlices/filterSlice";
import { useRef } from "react";
import * as React from "react";
import ReactDOM from "react-dom";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const FoodCategory = ({ data }) => {
  const { foodName, image, id } = data;
  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();
  const foodCategoryRef = useRef();
  const handleClick = () => {
    dispatch(changeFilter({ filter: foodName }));
  };
  //animation
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the component is in view
  });
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Define animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <div
        ref={foodCategoryRef}
        className={`food ${filter === foodName ? "activeFilter" : ""}`}
        style={{
          margin: "5px",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
          width: "130px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <img
          src={image}
          alt=""
          style={{
            height: "110px",
            width: "110px",
            borderRadius: "50%",
          }}
        />
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            margin: "0px",
          }}
        >
          {" "}
          <b>{foodName}</b>{" "}
        </p>
      </div>
    </motion.div>
  );
};
export default FoodCategory;
