import { useState } from "react";
import { Button } from "@mui/material";

const Form = ({
  sessionTime,
  date,
  handleCloseBookingForm,
  SetSessionBooked,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  function validateForm() {
    if (name && phone && email) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }
  async function handleSubmitButton(e) {
    e.preventDefault();
    let time = sessionTime;
    const newBooking = {
      name,
      phone,
      email,
      date,
      time,
    };

    try {
      const res = await fetch(
        "https://animal-server.onrender.com/volunteers-and-sessions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBooking),
        }
      );

      if (!res.ok) {
        if (!newBooking.name) {
          setErrorMessage("Name field is missing");
        } else if (!newBooking.phone) {
          setErrorMessage("Phone field is missing");
        } else if (!newBooking.email) {
          setErrorMessage("Email field is missing");
        }
      } else if (res.ok) {
        setErrorMessage("");
        SetSessionBooked(true);
      }

      const response = await fetch(
        "https://animal-server.onrender.com/sessions"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch video list (${response.status})`);
      }

      const data = await response.json();
      console.log(data);

      setName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <form className="form-inputs" onSubmit={handleSubmitButton} autoComplete="off">
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          validateForm();
        }}
        placeholder="Enter Your FullName"
        className="input-Name"
      ></input>{" "}
      <br></br>
      <input
        type="phone"
        value={phone}
        onChange={(e) => {
          validateForm();
          setPhone(e.target.value);
        }}
        className="input-area"
        placeholder="Enter your Phone Number"
      ></input>
      <span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            validateForm();
            setEmail(e.target.value);
          }}
          className="input-area"
          placeholder="Enter your email address"
        ></input>
      </span>
      <br></br>
      <Button
        variant="contained"
        type="submit"
        onClick={handleCloseBookingForm}
        disabled={isSubmitDisabled}
      >
        Submit
      </Button>
    </form>
  );
};
export default Form;
