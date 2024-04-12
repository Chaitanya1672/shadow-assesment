import DataGridComponent from "../components/DataGridComponent";
import React, { Suspense } from 'react';

export const metadata = {
  title: "Data Grid Table",
};

export default function Page() {
  return(
    //Suspense for useSearchParams
    <Suspense fallback="Loading...">
      <DataGridComponent />;
    </Suspense>
  )
}
