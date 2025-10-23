import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import TableEntry from "./TableEntry.tsx";
import { type SessionData } from "@/types/SessionData.ts";
const pastDataSample: SessionData[] = [
  {
    sessionId: "S001",
    status: "Completed",
    date: new Date().toLocaleString(),
    asana: "Shavasana",
  },
  {
    sessionId: "S002",
    status: "Completed",
    date: new Date().toLocaleString(),
    asana: "Downward Dog",
  },
];

const PastData = () => {
  return (
    <div className="mt-4">
      <div className="text-center text-black dark:text-white text-2xl md:text-xl sm:text-base">
        Past Sessions
      </div>
      <Table>
        <TableCaption>A list of your recent sessions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Session ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left">Asana</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastDataSample.length > 0 && pastDataSample.map((session) => (
            <TableEntry
              key={session.sessionId}
              sessionId={session.sessionId}
              status={session.status}
              date={session.date}
              asana={session.asana}
            />
          ))}
          {pastDataSample.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No past sessions available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PastData;
