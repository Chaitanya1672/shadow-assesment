import Filters from './Filters'
import DataGridTable from './DataGridTable'
import { Box } from '@mui/material'

const DataGridComponent = () => {
  return (
    <Box>
      <Filters/>
      <DataGridTable/>
    </Box>
  )
}

export default DataGridComponent