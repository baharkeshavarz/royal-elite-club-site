import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface FilterWrapperProps {
  title: string;
  children: ReactNode;
  expanded?: boolean;
}

const FilterWrapper: FC<FilterWrapperProps> = ({
  title,
  expanded = false,
  children,
}) => {
  return (
    <Accordion variant="outlined" defaultExpanded={expanded} sx={{ my: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-label="Expand"
        aria-controls="-content"
        id="-header"
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default FilterWrapper;
