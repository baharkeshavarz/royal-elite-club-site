import { Paper, PaperProps } from '@mui/material'
import { FC } from 'react'

const FormPaper: FC<PaperProps<any>> = props => {
  return <Paper component="form" {...props} />
}

export default FormPaper
