import { useState } from "react";
import { Button } from "@mui/material";

const Form = ({ sessionType }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmitButton = (e) => {
        e.preventDefault();
        let newBooking = {};
        newBooking.sessionType = sessionType;
        newBooking.name = name;
        newBooking.phone = phone;
        newBooking.email = email;
        console.log("hello", newBooking);

    };
    return (
        <form className="form-inputs" onSubmit={handleSubmitButton} >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your FullName" className="input-Name"></input>
            <br></br>
            <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-area" placeholder="Enter your Phone Number"></input>
            <span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-area" placeholder="Enter your email address"></input>
            </span>
            <br></br>
            <Button variant="contained" type="sabmit">Submit</Button>
        </form>
    );
};
export default Form;