import { TableCell, TableRow } from "@/components/ui/table.tsx";

interface TableEntryProps {
  sessionId: string;
  status: string;
  date: string;
  asana: string;
}

const TableEntry: React.FC<TableEntryProps> = ({ sessionId, status, date, asana }) => {
  return (
    <>
      <TableRow>
        <TableCell className="font-medium
        
        ">{sessionId}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell className="text-left">{asana}</TableCell>
      </TableRow>
    </>
  );
};

export default TableEntry;
