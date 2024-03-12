import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const titleStyle = {
    color: "#3f51b5",
  };

  const buttonStyle = {
    marginTop: "20px",
  };

  return (
    <Container sx={containerStyle} maxWidth="sm">
      <Typography style={titleStyle} variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Desculpe, a página que você está procurando não existe.
      </Typography>
      <Box style={buttonStyle}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Voltar para a página inicial
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
