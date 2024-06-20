import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { DollarSign } from "lucide-react"

const BCT_Transaction = [
    {
        Hash_ID	: "a69996125",
        Time: "13 Jun 2024 11:55:31",
        Amount: "$250.00",
        BTC_Price: "$66,783.90",
    },
    {
        Hash_ID	: "dc153f3842",
        Time: "13 Jun 2024 11:55:47",
        Amount: "$218.60",
        BTC_Price: "$66,784.12",
    },
    {
        Hash_ID	: "e9080be8be6",
        Time: "13 Jun 2024 11:56:01",
        Amount: "$178.00",
        BTC_Price: "$66,786.53",
    },
    {
        Hash_ID	: "c9bb93863",
        Time: "13 Jun 2024 11:56:51",
        Amount: "$48.82",
        BTC_Price: "$66,783.98",
    },
    {
        Hash_ID	: "c3bd3bfde2",
        Time: "13 Jun 2024 11:56:58",
        Amount: "$79.87",
        BTC_Price: "$66,783.86",
    },
]

export function Cards_Transactions() {
    return (
        <Table>
            <TableHeader>
                <CardHeader className="px-7">
                    <DollarSign></DollarSign>
                    <CardTitle>Latest Transactions</CardTitle>
                    <CardDescription>Add a description</CardDescription>
                </CardHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Hash ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">BTC Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {BCT_Transaction.map((Hash_ID) => (
                    <TableRow key={Hash_ID.Hash_ID}>
                        <TableCell className="font-medium">{Hash_ID.Hash_ID}</TableCell>
                        <TableCell>{Hash_ID.Time}</TableCell>
                        <TableCell>{Hash_ID.Amount}</TableCell>
                        <TableCell>{Hash_ID.BTC_Price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
