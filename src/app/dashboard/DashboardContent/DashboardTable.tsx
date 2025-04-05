import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function DashboardTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Patient Name</TableHead>
          <TableHead className="text-center">Appointment Type</TableHead>
          <TableHead className="text-center">Time of Appointment</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Naveen Satanarachchi</TableCell>
          <TableCell className="text-center">General Appointment</TableCell>
          <TableCell className="text-center">04:30 pm</TableCell>
          <TableCell className="text-center">
            <Badge className="bg-amber-600">Pending</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Thejana Satanarachchi</TableCell>
          <TableCell className="text-center">General Appointment</TableCell>
          <TableCell className="text-center">04:10 pm</TableCell>
          <TableCell className="text-center">
            <Badge className="bg-green-600">Confirmed</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default DashboardTable;
