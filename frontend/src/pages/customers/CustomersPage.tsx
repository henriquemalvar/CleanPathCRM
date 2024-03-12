import {
  Box,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { ICustomer } from "../../types/customer";
import {
  createCustomer,
  deleteCustomer,
  listCustomers,
  updateCustomer,
} from "../../utils/api";
import CustomerDialog from "../../components/CustomerDialog";
import { CustomerItem } from "../../components/CustomerItem";
import DeleteDialog from "../../components/DeleteDialog";
import FilterAccordion from "../../components/FilterAccordion";
import RoutesModal from "../../components/RoutesDialog";
import { SkeletonItem } from "../../components/SkeletonItem";

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<ICustomer | null>(
    null
  );
  const [filter, setFilter] = useState<Partial<ICustomer>>({});
  const [routesDialogOpen, setRoutesDialogOpen] = useState(false);

  const handleDeleteDialogOpen = (customer: ICustomer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      handleDelete(customerToDelete);
    }
    handleDeleteDialogClose();
  };

  useEffect(() => {
    listCustomers(filter)
      .then((response: AxiosResponse) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.error("Erro ao buscar clientes:", error);
        setLoading(false);
      });
  }, [filter]);

  const handleOpen = (customer?: ICustomer) => {
    setEditingCustomer(customer || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRoutesDialog = () => {
    setRoutesDialogOpen(true);
  };

  const handleCloseRoutesDialog = () => {
    setRoutesDialogOpen(false);
  };

  const handleSave = (customer: ICustomer) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id!, customer)
        .then((response: AxiosResponse) => {
          setCustomers(
            customers.map((c) =>
              c.id === response.data.id ? response.data : c
            )
          );
        })
        .catch((error: AxiosError) =>
          console.error("Erro ao atualizar cliente:", error)
        );
    } else {
      createCustomer(customer)
        .then((response: AxiosResponse) => {
          setCustomers([...customers, response.data]);
        })
        .catch((error: AxiosError) =>
          console.error("Erro ao criar cliente:", error)
        );
    }
    handleClose();
  };

  const handleDelete = (customer: ICustomer) => {
    deleteCustomer(customer.id!)
      .then(() => {
        setCustomers(customers.filter((c) => c.id !== customer.id));
      })
      .catch((error: AxiosError) =>
        console.error("Erro ao excluir cliente:", error)
      );
  };
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Clientes
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
                style={{ marginRight: "10px" }}
              >
                Criar Cliente
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenRoutesDialog}
              >
                Ver Rotas
              </Button>
            </Box>
          </Box>
          <FilterAccordion
            filter={filter}
            onFilterChange={setFilter}
            onClearFilter={() => setFilter({})}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <List>
              {loading ? (
                <Box p={1}>
                  {[...Array(5)].map((_, index) => (
                    <SkeletonItem key={index} />
                  ))}
                </Box>
              ) : (
                customers.map((customer) => (
                  <CustomerItem
                    key={customer.id}
                    customer={customer}
                    onEdit={handleOpen}
                    onDelete={handleDeleteDialogOpen}
                  />
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <RoutesModal open={routesDialogOpen} onClose={handleCloseRoutesDialog} />
      <CustomerDialog
        open={open}
        customer={editingCustomer}
        onClose={handleClose}
        onSave={handleSave}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default CustomersPage;
