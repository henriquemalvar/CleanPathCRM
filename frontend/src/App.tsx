import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CustomersPage from "./pages/customers/CustomersPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "transparent" }}
      >
        <Box
          style={{
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            padding: "0 10%",
          }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
            >
              <Typography
                variant="h6"
                component="div"
                style={{ color: "black" }}
              >
                CleanPathCRM
              </Typography>
            </Link>
            <Box>
              <Button
                color="inherit"
                component={Link}
                to="/"
                style={{ color: "gray" }}
              >
                Início
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/clientes"
                style={{ color: "gray" }}
              >
                Clientes
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <Box p={2}>
        <Routes>
          <Route path="/clientes" element={<CustomersPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
