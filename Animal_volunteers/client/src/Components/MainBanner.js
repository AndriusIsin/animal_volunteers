import { Paper, Box, Button } from "@mui/material";
import "./MainBanner.css";

const MainBanner = () => {
    return (
        <Paper style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "flex-start",
            height: "90vh",
            width: "100%",
            backgroundImage: "url(https://cst-media4.viomassl.com/2776/524559/1920x0s)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0",
        }}>
            <div className="textContainer">
                <h1>Helping Paws, <br></br>Growing Hearts!</h1>
                <h3>Join Our Animal Mini Farm Family!</h3>
                <p>Our mini farm relies on dedicated volunteers to ensure our animals are well-fed and cared for. Join us to feed, nurture, and connect with our animals. Your help makes a real difference in their lives.
                </p>


                <Box my={3} sx={{
                    justifySelf: "flex-start",
                }}>
                    <Button
                        sx={{ background: "rgba(245, 191, 66, 0.5)", color: "rgb(255, 250, 250)", borderRadius: 20, borderColor: "rgb(245, 191, 66)" }} variant="outlined">
                        Book Session
                    </Button>
                </Box>
            </div>
        </Paper >
    );
};

export default MainBanner;