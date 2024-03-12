import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ICustomer } from "../types/customer";

interface FilterAccordionProps {
  filter: Partial<ICustomer>;
  onFilterChange: (filter: Partial<ICustomer>) => void;
  onClearFilter: () => void;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  filter,
  onFilterChange,
  onClearFilter,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Filtro</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <FormControl>
            <InputLabel htmlFor="name">Nome</InputLabel>
            <Input
              id="name"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              value={filter.email}
              onChange={handleFilterChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phone">Telefone</InputLabel>
            <Input
              id="phone"
              name="phone"
              value={filter.phone}
              onChange={handleFilterChange}
            />
          </FormControl>
          <Button onClick={onClearFilter}>Limpar Filtro</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
