import DataGridComponent from "../components/DataGridComponent";

export const metadata = {
  title: "Data Grid Table",
};

export default function Page() {
  console.log('server renderesd')
  return <DataGridComponent />;
}
