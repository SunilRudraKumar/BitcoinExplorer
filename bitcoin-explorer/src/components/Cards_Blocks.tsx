import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// import SquareIcon from '@mui/icons-material/Square';
import { Cuboid } from "lucide-react";

const BCT = [
  {
    Number: "847805",
    Date: "13 June 2024",
    TxCount: "6412",
    Size: "1.47 Mb",
  },
  {
    Number: "847804",
    Date: "13 June 2024",
    TxCount: "6027",
    Size: "1.38 Mb",
  },
  {
    Number: "847803",
    Date: "13 June 2024",
    TxCount: "6300",
    Size: "1.27 Mb",
  },
  {
    Number: "847802",
    Date: "13 June 2024",
    TxCount: "6190",
    Size: "1.49 Mb",
  },
  {
    Number: "847801",
    Date: "13 June 2024",
    TxCount: "6232",
    Size: "1.41 Mb",
  },
];

export function Cards_Blocks() {
  return (
    <Table>
      <TableHeader>
        <CardHeader className="px-7">
          <Cuboid></Cuboid>
          <CardTitle>Latest Blocks</CardTitle>
          <CardDescription>Add a description</CardDescription>
        </CardHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Tx Count</TableHead>
          <TableHead className="text-right">Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {BCT.map((Number) => (
          <TableRow key={Number.Number}>
            {/* <TableCell className="font-medium"><SquareIcon className="mr-2" />{Number.Number}</TableCell> */}
            <TableCell>{Number.Date}</TableCell>
            <TableCell>{Number.TxCount}</TableCell>
            <TableCell className="text-right">{Number.Size}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
