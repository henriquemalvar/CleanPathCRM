import React, { useEffect, useState } from "react";
import { ICustomer } from "../types/customer";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";

interface CustomerDialogProps {
  open: boolean;
  customer: ICustomer | null;
  onClose: () => void;
  onSave: (customer: ICustomer) => void;
}
const initialCustomerState = {
  name: "",
  email: "",
  phone: "",
  coordinate_x: 0,
  coordinate_y: 0,
};

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  open,
  customer,
  onClose,
  onSave,
}) => {
  const [newCustomer, setNewCustomer] =
    useState<ICustomer>(initialCustomerState);

  useEffect(() => {
    setNewCustomer(customer || initialCustomerState);
  }, [customer]);

  const handleSave = () => {
    onSave(newCustomer);
    if (!customer) {
      resetForm();
    }
  };

  const resetForm = () => {
    setNewCustomer(initialCustomerState);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Container maxWidth="sm">
        <DialogTitle>
          {customer ? "Editar Cliente" : "Criar Cliente"}
        </DialogTitle>
        <Box p={1}>
          <Divider />
        </Box>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <TextField
              label="Nome"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
            <TextField
              label="Telefone"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />
            <TextField
              label="Coordenada X"
              value={newCustomer.coordinate_x}
              onChange={(e) =>
                setNewCustomer({
                  ...newCustomer,
                  coordinate_x: e.target.value ? parseFloat(e.target.value) : 0,
                })
              }
            />
            <TextField
              label="Coordenada Y"
              value={newCustomer.coordinate_y}
              onChange={(e) =>
                setNewCustomer({
                  ...newCustomer,
                  coordinate_y: e.target.value ? parseFloat(e.target.value) : 0,
                })
              }
            />
          </Stack>
        </DialogContent>
        <Box p={1}>
          <Divider />
        </Box>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
};

export default CustomerDialog;
