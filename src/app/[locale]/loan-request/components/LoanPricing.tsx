import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';
import { LoanItem } from '../data';

const loanDataHeaders = [
  'مبلغ وام (ریال)',
  'دوره باز پرداخت',
  'مبلغ قسط اول (ریال)',
  'مبلغ سایر اقساط (ریال)',
  'چک ضمانت(ریال)',
  'مجموع بازپرداخت(ریال)',
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: '0.8rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

interface LoanPricingProps {
  loan: LoanItem;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LoanPricing: FC<LoanPricingProps> = ({ loan }) => {
  return (
    <Box width="100%" py={2}>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {loanDataHeaders.map((loan) => (
                <StyledTableCell key={loan}>{loan}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loan.loans.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.amount}
                </StyledTableCell>
                <StyledTableCell>{row.repayment_time}</StyledTableCell>
                <StyledTableCell>{row.first_loan}</StyledTableCell>
                <StyledTableCell>{row.other_loans}</StyledTableCell>
                <StyledTableCell>{row.cheque_amount}</StyledTableCell>
                <StyledTableCell>{row.total_amount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoanPricing;
