import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const HomePage: React.FC = () => {
  const textStyle = {
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
    padding: "10px",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: "4px",
  };

  const buttonStyle = {
    color: "white",
    backgroundColor: "#007BFF",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
    padding: "10px 20px",
    borderRadius: "12px",
    fontWeight: "bold",
  };

  return (
    <Container
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image/home.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "88vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        maxWidth: "100%",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom style={textStyle}>
        Bem-vindo ao CleanPathCRM
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/clientes"
        style={buttonStyle}
      >
        Ver Clientes
      </Button>
    </Container>
  );
};

export default HomePage;
