import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ICustomer } from "../types/customer";
import { calculateRoute } from "../utils/api";

const RoutesModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [routes, setRoutes] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoutes = useCallback(() => {
    setLoading(true);
    calculateRoute()
      .then((response: AxiosResponse) => {
        setRoutes(response.data);
      })
      .catch((error: AxiosError) =>
        console.error("Erro ao buscar rotas:", error)
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (open) {
      loadRoutes();
    }
  }, [loadRoutes, open]);

  const printRoutes = () => {
    let routeList = routes
      .map(
        (route) =>
          `Nome: ${route.name}, Email: ${route.email}, Telefone: ${route.phone}, Coordenadas: (${route.coordinate_x}, ${route.coordinate_y})`
      )
      .join("\n");

    let printWindow = window.open("", "", "width=600,height=600");
    printWindow?.document.write(`<pre>${routeList}</pre>`);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Rotas</DialogTitle>
      <Box p={1}>
        <Divider />
      </Box>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Button variant="contained" color="primary" onClick={printRoutes}>
              Imprimir Rotas
            </Button>
          </Box>
        </Box>
        {loading ? (
          <Box p={1}>
            {[...Array(5)].map((_, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box ml={2} width="100%">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <List>
            {routes.map((route) => (
              <ListItem key={route.id}>
                <ListItemText
                  primary={route.name}
                  secondary={`Email: ${route.email}, Telefone: ${route.phone}, Coordenadas: (${route.coordinate_x}, ${route.coordinate_y})`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <Box p={1}>
        <Divider />
      </Box>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoutesModal;
