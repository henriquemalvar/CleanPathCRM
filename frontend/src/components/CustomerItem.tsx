import React from "react";
import { ICustomer } from "../types/customer";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CustomerItemProps {
  customer: ICustomer;
  onEdit: (customer: ICustomer) => void;
  onDelete: (customer: ICustomer) => void;
}
export const CustomerItem: React.FC<CustomerItemProps> = ({
  customer,
  onEdit,
  onDelete,
}) => (
  <ListItem key={customer.id}>
    <ListItemText
      primary={customer.name}
      secondary={`Email: ${customer.email}, Telefone: ${customer.phone}`}
    />
    <ListItemSecondaryAction>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onDelete(customer)}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton edge="end" aria-label="edit" onClick={() => onEdit(customer)}>
        <EditIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
