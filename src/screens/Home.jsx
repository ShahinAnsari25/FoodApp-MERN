import Navbar from "../Componants/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FoodCard from "../Componants/FoodCard";
import FoodCategory from "../Componants/FoodCategory";
import Footer from "../Componants/footer";
import CartFood from "../Componants/CartFood";
import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRef } from "react";
import { updateSum } from "../ReduxSlices/SumSlice";
import { deleteAllFromCart } from "../ReduxSlices/CartItems";
import { toggleCart, changePage } from "../ReduxSlices/CartButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  //getting sum value from store
  const sum = useSelector((state) => state.sum.value);
  //getting cart items from store
  const cartItem = useSelector((state) => state.cartItem);
  //getting filtered items from store
  const filter = useSelector((state) => state.filter.value);
  const sideBarRef = useRef();
  //getting sidebar status(order/cart)
  const cart = useSelector((state) => state.cart);

  //finding items on search
  const [searchedItem, setSearchedItem] = useState("");
  const searchRef = useRef();
  const handleSearchOnChage = () => {
    setSearchedItem(searchRef.current.value);
  };

  //getting data from backend
  const [categoryData, setCategoryData] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const loadData = async () => {
    const response = await fetch("http://localhost:3000/api/getFoodItems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cors: "cors",
    });
    const data = await response.json();
    setCategoryData(data.category);
    setFoodItems(data.foodItems);
    console.log(data.foodItems);
  };
  useEffect(() => {
    loadData();
  }, []);

  //calculating total amount by accessing each cartItem
  const calculateTotal = () => {
    return cartItem.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
  };
  const totalAmount = calculateTotal();

  //fetching data for order
  const [orderedItems, setOrderedItems] = useState([]);
  const useId = localStorage.getItem("userId");
  const jsonObject = {
    userId: useId,
  };
  const loadOrderedData = async () => {
    const response = await fetch("http://localhost:3000/api/getOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cors: "cors",
      body: JSON.stringify(jsonObject),
    });
    const data = await response.json();
    console.log(data.data);
    setOrderedItems(data.data.reverse());
  };
  useEffect(() => {
    loadOrderedData();
  }, []);

  //posting data on confirm order
  const handleConfirmOrder = async () => {
    const userId = localStorage.getItem("userId");
    setConfirmOrder(true);
    await cartItem.map((item) => {
      const objectBody = {
        userId: userId,
        itemName: item.name,
        price: item.price * item.quantity,
        quantity: item.quantity,
        image: item.image,
      };

      fetch("http://localhost:3000/api/postRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectBody),
        cors: "cors",
      });
    });
    toast.success("Order Placed successfully!");
    toast.success("Your Order will be delivered in 40 minutes.");
    dispatch(deleteAllFromCart());
    loadOrderedData();
  };

  return (
    <div>
      <Navbar></Navbar>
      <div
        className="commonSection"
        style={{
          marginTop: "90px",
        }}
      >
        <motion.div
          className="section1"
          initial={{ width: "100%" }}
          animate={{ width: cart.value ? "75%" : "100%" }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="carousel">
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  class="carousel-item active"
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src="/pizza.jpg"
                    class="d-block w-100"
                    alt="..."
                    style={{
                      height: "430px",
                      objectFit: "cover",
                    }}
                  />
                  <motion.p
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // transition={{
                    //   duration: 1,
                    //   ease: "easeInOut",
                    // }}
                    style={{
                      margin: "0px",
                      fontSize: "30px",
                      position: "absolute",
                      top: "100px",
                      left: "140px",
                      zIndex: "5",
                      color: "white",
                      fontWeight: "bold",
                      width: "330px",
                    }}
                  >
                    Bringing the Best Restaurants to Your Doorstep, One
                    Delicious Meal at a Time.
                  </motion.p>
                </div>
                <div
                  class="carousel-item"
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src="momo5.jpg"
                    class="d-block w-100"
                    alt="..."
                    style={{
                      height: "430px",
                      objectFit: "cover",
                    }}
                  />
                  <p
                    style={{
                      margin: "0px",
                      fontSize: "30px",
                      position: "absolute",
                      top: "100px",
                      left: "140px",
                      zIndex: "5",
                      color: "white",
                      fontWeight: "bold",
                      width: "350px",
                    }}
                  >
                    Savor the Flavors You Love, Delivered Hot and Fresh, Right
                    to Your Door.
                  </p>
                </div>
                <div class="carousel-item">
                  <img
                    src="burger2.jpg"
                    class="d-block w-100"
                    alt="..."
                    style={{
                      height: "430px",
                      objectFit: "cover",
                    }}
                  />
                  <p
                    style={{
                      margin: "0px",
                      fontSize: "30px",
                      position: "absolute",
                      top: "100px",
                      left: "140px",
                      zIndex: "5",
                      color: "white",
                      fontWeight: "bold",
                      width: "350px",
                    }}
                  >
                    Craving Something Delicious? Get It Delivered in Minutes, No
                    Matter Where You Are.
                  </p>
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div
            className="serachBarButtonContainer"
            style={{
              display: "flex",
              width: `${cart.value ? "50%" : "70%"}`,
              alignItems: "center",
              padding: "20px",
              justifyContent: "space-between",
              position: "absolute",
              top: "400px",
              left: "200px",
              zIndex: "5",
            }}
          >
            <div
              className="searchBarContainer"
              style={{
                width: "100%",
              }}
            >
              <input
                className="searchTextField"
                placeholder="Search..."
                ref={searchRef}
                style={{
                  width: "100%",
                  color: "white",
                }}
                onChange={handleSearchOnChage}
              />
            </div>
            {/* <button onClick={handleSearchOnChage} style={{}}>
              Search
            </button> */}
          </div>
          <div
            className="categoryContainer"
            style={{
              padding: "10px",
              margin: "20px",
              borderRadius: "10px",
              position: "relative",
              backgroundColor: "#FABF00",
            }}
          >
            <h2
              style={{
                backgroundColor: "transparent",
                paddingLeft: "10px",
                paddingRight: "10px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Choose Food Category
            </h2>
            <div
              className="foodCategoryContainer"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0px",
                paddingLeft: "13px",
                paddingRight: "13px",
              }}
            >
              {console.log(categoryData)}
              {categoryData.map((item, index) => (
                <FoodCategory
                  key={index}
                  data={{
                    foodName: item.CategoryName,
                    image: item.image,
                    id: item._id,
                  }}
                ></FoodCategory>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="cardContainer"
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                width: `${cart.value ? "98%" : "97%"}`,
              }}
            >
              {foodItems.map((item, index) =>
                searchedItem === "" ? (
                  filter === "all" ? (
                    <FoodCard
                      data={{
                        itemName: item.name,
                        categoryName: item.CategoryName,
                        id: item._id,
                        description: item.description,
                        image: item.img,
                        options: item.options,
                      }}
                    ></FoodCard>
                  ) : (
                    item.CategoryName === filter && (
                      <FoodCard
                        data={{
                          itemName: item.name,
                          categoryName: item.CategoryName,
                          id: item._id,
                          description: item.description,
                          image: item.img,
                          options: item.options,
                        }}
                      ></FoodCard>
                    )
                  )
                ) : item.name
                    .toLowerCase()
                    .includes(searchedItem.toLowerCase()) ? (
                  <FoodCard
                    data={{
                      itemName: item.name,
                      categoryName: item.CategoryName,
                      id: item._id,
                      description: item.description,
                      image: item.img,
                      options: item.options,
                    }}
                  ></FoodCard>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          ref={sideBarRef}
          className="section2"
          style={{
            width: "25%",
            backgroundColor: "#111a24",
            position: "fixed",
            top: "80px",
            right: "0px",
            height: "550px",
            padding: "10px",
            display: `${cart.value ? "block" : "none"}`,
            overflowY: "auto",
            color: "white",
            paddingTop: "10px",
          }}
          initial={{ x: 50, opacity: 0 }}
          animate={cart.value ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{
            duration: "0.5",
            ease: "easeInOut",
          }}
        >
          <div
            className="profileSection"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span src="" alt="">
              <svg
                style={{
                  height: "40px",
                  width: "40px",
                  paddingTop: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f3f2",
                  fill: "#C6C7C8",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </span>
            <p
              style={{
                margin: "0px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {localStorage.getItem("name")}
            </p>
          </div>
          <hr />
          <div className="myCartSection">
            {cart.page === "cart" ? (
              <h5
                style={{
                  fontWeight: "bold",
                }}
              >
                {" "}
                My Cart
              </h5>
            ) : (
              <h5
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                {" "}
                My Orders
              </h5>
            )}

            <div
              className="cartFoodContainer"
              style={{
                overflowY: "auto",
              }}
            >
              {cart.page === "cart"
                ? cartItem.map((item, index) => (
                    // dispatch(updateSum({ updatedSum: sum + item.unitPrice })),
                    // console.log(sum),
                    <CartFood
                      key={index}
                      data={{
                        name: item.name,
                        image: item.image,
                        unitPrice: item.unitPrice,
                        id: item.id,
                        quantity: item.quantity,
                      }}
                    ></CartFood>
                  ))
                : orderedItems.map((item, index) => (
                    <div
                      key={index}
                      className="cartFood"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        marginBottom: "10px",
                        borderBottom: "1px solid #C6C7C8",
                        paddingBottom: "5px",
                      }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          height: "50px",
                          width: "50px",
                          border: "1px solid black",
                          borderRadius: "50%",
                        }}
                      />
                      <p
                        style={{
                          margin: "0px",
                          width: "45%",
                          fontWeight: "bold",
                        }}
                      >
                        {item.itemName}
                      </p>
                      <p
                        style={{
                          margin: "0px",
                          width: "15%",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantity}
                      </p>
                      <p
                        style={{
                          margin: "0px",
                          width: "15%",
                          fontWeight: "bold",
                        }}
                      >
                        {item.price}/-
                      </p>
                    </div>
                  ))}

              {/* <CartFood data={{name:}}></CartFood> */}
            </div>

            {cart.page === "cart" && (
              <div className="totalSubTotalContainer">
                <div
                  className="total"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {totalAmount}/-
                  </p>
                </div>
              </div>
            )}
            {cart.page === "cart" && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FABF00",
                }}
                onClick={handleConfirmOrder}
              >
                <b>Confirm Order</b>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Home;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "Burger" },
  { label: "Pizza" },
  { label: "Chicken" },
  { label: "Rice" },
  { label: "Sushi" },
  { label: "Sweets" },
  { label: "Pasta" },
  { label: "Momo" },
  { label: "Salat" },
  { label: "Fried rice" },
];
