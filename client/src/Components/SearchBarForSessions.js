import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const SearchBarForSessions = ({ allSessions, setFilteredSessions }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const theme = createTheme({
        palette: {
            primary: {
                main: "#657e82",
                light: "#efeae4",
            },
        },
    });

    const options = Array.from(allSessions).map((option) => {
        const firstLetter = option.volunteer_name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...option,
        };
    });


    const GroupHeader = styled("div")(({ theme }) => ({
        position: "sticky",
        top: "-8px",
        padding: "2px 8px",
        color: theme.palette.primary.main,
        backgroundColor:
            theme.palette.mode === "light"
                ? lighten(theme.palette.primary.light, 0.85)
                : darken(theme.palette.primary.main, 0.8),
    }));

    const GroupItems = styled("ul")({
        padding: 0,
    });

    const handleAutocompleteChange = (event, newValue) => {
        setSelectedValue(newValue);
        console.log("newValue", newValue);

        if (newValue !== "" && newValue !== null) {
            if (allSessions !== null && allSessions !== []) {
                const searchSessions = allSessions.filter((session) => session.volunteer_name === newValue.volunteer_name);
                setFilteredSessions(searchSessions);
            }
        } else {
            setFilteredSessions(allSessions);
        }
    };





    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                className="grouped-demo"
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => (option.volunteer_name ? option.volunteer_name : "")}
                sx={{ width: 300 }}
                value={selectedValue}
                onChange={handleAutocompleteChange}
                renderInput={(params) => <TextField {...params} label="Search Volunteer Name" />}
                renderGroup={(params) => (
                    <div key={params}>
                        <GroupHeader>{params.group}</GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                    </div>
                )}
            />
        </ThemeProvider>
    );
};

export default SearchBarForSessions;
