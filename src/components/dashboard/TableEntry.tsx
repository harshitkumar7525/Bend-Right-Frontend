import { TableCell, TableRow } from "@/components/ui/table.tsx";

interface TableEntryProps {
  status: string;
  date: string;
  asana: string;
}

const TableEntry: React.FC<TableEntryProps> = ({ status, date, asana }) => {
  return (
    <>
      <TableRow>
        <TableCell>{status}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell className="text-left">{asana}</TableCell>
      </TableRow>
    </>
  );
};

export default TableEntry;
