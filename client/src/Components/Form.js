import { useState } from "react";
import { Button } from "@mui/material";

const Form = ({ sessionTime, date, setSuccessMessage, disableInputs, setDisableInputs }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


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
            const res = await fetch("https://animal-server.onrender.com/volunteers-and-sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBooking),
            });

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
                setSuccessMessage("User and session created");
                setEmail("");
                setName("");
                setPhone("");
                setDisableInputs(true);

            }
            const response = await fetch("https://animal-server.onrender.com/sessions");

            if (!response.ok) {
                throw new Error(`Failed to fetch video list (${response.status})`);
            }


            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <form className="form-inputs" onSubmit={handleSubmitButton} >
            {errorMessage !== "" && <p>{errorMessage}</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setSuccessMessage("");
                }}
                disabled={disableInputs}
                placeholder="Enter Your FullName"
                className="input-Name"></input>
            <br></br>
            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={disableInputs} className="input-area" placeholder="Enter your Phone Number"></input>
            <span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={disableInputs} className="input-area" placeholder="Enter your email address"></input>
            </span>
            <br></br>
            <Button disabled={disableInputs} variant="contained" type="sabmit">Submit</Button>
        </form>
    );
};
export default Form;