import Navbar from "../Componants/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  //states to get input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password1, setPassword1] = useState("");
  //validating name
  const [isNameValid, setIsNameValid] = useState(true);
  const handleNameVal = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]+$/;
    setName(value);
    if (!regex.test(value) || value == "") {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  };

  //validating email
  const [isEmailValid, setIsEmailValid] = useState(true);
  const handleEmailVal = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(value);
    if (!regex.test(value) || value == "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };
  //validating address
  const [isAddValid, setIsAddValid] = useState(true);
  const handleAddVal = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value == "") {
      setIsAddValid(false);
    } else {
      setIsAddValid(true);
    }
  };

  //validating password
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const handlePasswordVal = (e) => {
    const value = e.target.value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword1(value);
    if (!regex.test(value) || value == "") {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  };
  //handle password
  const [password, setPassword] = useState(true);
  const handlePassword = () => {
    setPassword(!password);
  };

  const handleSubmit = async () => {
    const jsonBody = {
      name: name,
      address: address,
      email: email,
      password: password1,
    };
    console.log(jsonBody);

    try {
      const response = await fetch("http://localhost:3000/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cors: "cors",
        body: JSON.stringify(jsonBody),
      });
      if (response.ok) {
        toast.success("User registered successfully!");
        setName("");
        setEmail("");
        setAddress("");
        setPassword1("");
      } else {
        toast.error(response.json());
        console.log(response.json() + "error");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div
        className="loginFormContainer"
        style={{
          height: "86.5vh",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          backgroundImage: "url('pizzaBG.jpg')",
          backgroundSize: "cover",
          marginTop: "80px",
        }}
      >
        <div
          className="formContainer2"
          style={{
            width: "40%",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
            marginLeft: "25px",
            color: "#FABF00",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            Welcome !
          </h2>
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            Signup to continue...
          </h2>
          <form
            action=""
            style={{
              marginTop: "20px",
            }}
          >
            <TextField
              style={{
                width: "100%",
                color: "white",
              }}
              InputProps={{
                style: { color: "white" }, // Change input text color
              }}
              InputLabelProps={{
                style: { color: "white" }, // Change label text color
              }}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Change border color
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white", // Change border color on hover
                  },
                // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "white", // Change border color when focused
                // },
              }}
              value={name}
              id="outlined-password-input"
              label="Name"
              type="text"
              autoComplete="current-password"
              onChange={handleNameVal}
            />
            {!isNameValid && (
              <p
                style={{
                  color: "red",
                  margin: "0px",
                }}
              >
                Please enter a valid name!
              </p>
            )}

            <TextField
              InputProps={{
                style: { color: "white" }, // Change input text color
              }}
              InputLabelProps={{
                style: { color: "white" }, // Change label text color
              }}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Change border color
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white", // Change border color on hover
                  },
                // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "white", // Change border color when focused
                // },
              }}
              style={{
                width: "100%",
                marginTop: "15px",
              }}
              value={email}
              id="outlined-password-input"
              label="Email"
              type="text"
              autoComplete="current-password"
              onChange={handleEmailVal}
            />

            {!isEmailValid && (
              <p
                style={{
                  color: "red",
                  margin: "0px",
                }}
              >
                Please enter a valid email!
              </p>
            )}

            <TextField
              InputProps={{
                style: { color: "white" }, // Change input text color
              }}
              InputLabelProps={{
                style: { color: "white" }, // Change label text color
              }}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Change border color
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white", // Change border color on hover
                  },
                // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "white", // Change border color when focused
                // },
              }}
              style={{
                width: "100%",
                marginTop: "15px",
              }}
              value={address}
              id="outlined-password-input"
              label="Address"
              type="text"
              autoComplete="current-password"
              onChange={handleAddVal}
            />

            {!isAddValid && (
              <p
                style={{
                  color: "red",
                  margin: "0px",
                }}
              >
                Please enter a valid Address!
              </p>
            )}
            <div
              className="passwordContainer"
              style={{
                position: "relative",
              }}
            >
              <TextField
                InputProps={{
                  style: { color: "white" }, // Change input text color
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Change label text color
                }}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Change border color
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white", // Change border color on hover
                    },
                  // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  //   borderColor: "white", // Change border color when focused
                  // },
                }}
                style={{
                  width: "100%",
                  marginTop: "15px",
                }}
                value={password1}
                id="outlined-password-input"
                label="Password"
                type={password ? "password" : "text"}
                autoComplete="current-password"
                onChange={handlePasswordVal}
              />

              <span
                style={{
                  position: "absolute",
                  top: "27px",
                  right: "9px",
                  cursor: "pointer",
                }}
                onClick={handlePassword}
              >
                {password ? (
                  <svg
                    style={{
                      height: "20px",
                      width: "20px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg
                    style={{
                      height: "20px",
                      width: "20px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </span>
            </div>

            {!isPasswordValid && (
              <p
                style={{
                  color: "red",
                  margin: "0px",
                }}
              >
                Please enter a valid Password!
              </p>
            )}
            <Button
              style={{
                marginTop: "15px",
                backgroundColor: "#FABF00",
                color: "#111A24",
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              <b>Signup</b>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
