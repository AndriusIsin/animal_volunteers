import * as React from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "name", label: "Name", minWidth: 120 },
  { id: "phone", label: "Phone", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 20 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 50,
    align: "right",
  },
];

export default function Volunteers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    fetch("https://animal-server.onrender.com/volunteers")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    console.log("Editing user:", row);
  };

  const handleDelete = (row) => {
    console.log("Deleting user:", row);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    backgroundColor: "rgba(135, 155, 159, 0.2)",
                    color: "#54626F",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id !== "actions" ? (
                        row[column.id]
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              handleEdit(row.id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            sx={{
                              color: "#c1121f",
                            }}
                            onClick={() => handleDelete(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
