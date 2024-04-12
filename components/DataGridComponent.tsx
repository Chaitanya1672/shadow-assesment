import Filters from './Filters'
import DataGridTable from './DataGridTable'
import { Suspense } from 'react'
import LoadingComponent from './Loading'

const DataGridComponent = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Filters/>
      <DataGridTable/>
    </Suspense>
  )
}

export default DataGridComponent