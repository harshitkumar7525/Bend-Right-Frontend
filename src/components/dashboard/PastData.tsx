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
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContextProvider.tsx";

const PastData = () => {
  const { userId } = useContext(UserContext);
  const [pastData, setPastData] = useState<SessionData[]>([]);
  useEffect(() => {
    const fetchPastData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/sessions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data: SessionData[] = await response.json();
          console.log("Fetched past data:", data);
          data.reverse();
          setPastData(data);
        } else {
          console.error("Failed to fetch past data");
        }
      } catch (error) {
        console.error("Error fetching past data:", error);
      }
    };
    fetchPastData();
  }, [userId]);
  return (
    <div className="mt-4">
      <div className="text-center text-black dark:text-white text-2xl md:text-xl sm:text-base">
        Past Sessions
      </div>
      <Table>
        <TableCaption>A list of your recent sessions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left">Asana</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastData.length > 0 &&
            pastData.map((session) => (
              <TableEntry
                key={Math.random().toString(36).substring(2, 10).toUpperCase()}
                status={session.status}
                date={session.date}
                asana={session.asana}
              />
            ))}
          {pastData.length === 0 && (
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
