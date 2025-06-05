// InventoryList.tsx
"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { readAllInventoriesByUserId } from "@/app/api/inventories/inventories.api"
import Link from "next/link"
import { createMarket } from "@/app/api/markets/markets.api"
import { toast } from "sonner"

export type Inventory = {
    _id: string
    itemId: {
        _id: string
        name: string
        description: string
        imageUrl: string
        price: number
        createdAt: string
        updatedAt: string
    }
    userId: string
    clerkId: string
    quantity: number
    createdAt: string
    updatedAt: string
}

export function InventoryList() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [inventories, setInventories] = React.useState<Inventory[]>([])
    const { user } = useUser()
    const user_id = user?.publicMetadata.user_id as string

    const [isOpenMarket, setIsOpenMarket] = React.useState(false)
    const [selectedInventory, setSelectedInventory] = React.useState<Inventory | null>(null)
    const [marketQuantity, setMarketQuantity] = React.useState(1)
    const [marketPrice, setMarketPrice] = React.useState(0)

    React.useEffect(() => {
        const fetchData = async () => {
            if (!user_id) return
            try {
                const { inventories: apiInventories } = await readAllInventoriesByUserId(user_id)
                const transformedInventories: Inventory[] = apiInventories.map(inv => ({
                    ...inv,
                    itemId: typeof inv.itemId === 'string' ? JSON.parse(inv.itemId) : inv.itemId
                }))
                setInventories(transformedInventories)
            } catch (error) {
                console.error("Error fetching inventories:", error)
            }
        }
        fetchData()
    }, [user_id])

    const columns: ColumnDef<Inventory>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "Ảnh",
            header: "",
            cell: ({ row }) => (
                <div className="w-12 h-12 relative">
                    <Image
                        width={36}
                        height={36}
                        src={row.original.itemId.imageUrl}
                        alt={row.original.itemId.name}
                        className="object-cover rounded-md w-full h-full"
                    />
                </div>
            ),
        },
        {
            accessorKey: "Tên vật phẩm",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tên vật phẩm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.original.itemId.name}</div>,
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Số lượng
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
        },
        {
            accessorKey: "Giá tiền",
            header: () => <div className="text-right">Giá trị /1</div>,
            cell: ({ row }) => {
                const price = row.original.itemId.price
                const formatted = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const inventory = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(inventory._id)}>
                                Sao chép ID vật phẩm
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/cua-hang/items/${inventory.itemId._id}`}>Xem chi tiết</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                setSelectedInventory(inventory)
                                setMarketQuantity(1)
                                setMarketPrice(inventory.itemId.price)
                                setIsOpenMarket(true)
                            }}>
                                Đăng lên chợ
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data: inventories,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Tìm bằng tên vật phẩm ..."
                    value={(table.getColumn("Tên vật phẩm")?.getFilterValue() as string) ?? ""}
                    onChange={(e) => table.getColumn("Tên vật phẩm")?.setFilterValue(e.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Tùy chỉnh cột <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter(col => col.getCanHide()).map(col => (
                            <DropdownMenuCheckboxItem
                                key={col.id}
                                className="capitalize"
                                checked={col.getIsVisible()}
                                onCheckedChange={(value) => col.toggleVisibility(!!value)}
                            >
                                {col.id === "quantity" ? "Số lượng" : col.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Không có kết quả.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} hàng được chọn
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Trang trước
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Trang tiếp
                    </Button>
                </div>
            </div>


            {/* Dialog đăng lên chợ */}
            <Dialog open={isOpenMarket} onOpenChange={setIsOpenMarket}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Đăng vật phẩm lên chợ</DialogTitle>
                    </DialogHeader>
                    {selectedInventory && (
                        <div className="space-y-4">
                            <p>Nhập số lượng và giá muốn đăng bán:</p>
                            <Input
                                type="number"
                                min={1}
                                max={selectedInventory.quantity}
                                value={marketQuantity}
                                onChange={(e) => setMarketQuantity(parseInt(e.target.value))}
                                placeholder="Số lượng"
                            />
                            <Input
                                type="number"
                                value={marketPrice}
                                onChange={(e) => setMarketPrice(parseInt(e.target.value))}
                                placeholder="Giá bán mỗi đơn vị (VND)"
                            />
                            <Button
                                onClick={async () => {
                                    if (!selectedInventory) return;
                                    try {
                                        await createMarket(
                                            user_id,
                                            selectedInventory.itemId._id,
                                            marketPrice,
                                            marketQuantity
                                        );
                                        toast.success("Đăng bán thành công!", {
                                            description: `Vật phẩm ${selectedInventory.itemId.name} đã được đăng bán với giá ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(marketPrice)} mỗi đơn vị.`,
                                        });
                                    } catch (error) {
                                        console.error("Error posting to market:", error);
                                        toast.error("Đăng bán thất bại!", {
                                            description: "Đã xảy ra lỗi khi đăng bán vật phẩm. Vui lòng thử lại sau.",
                                        });
                                    }
                                    setIsOpenMarket(false);
                                }}
                            >
                                Xác nhận đăng bán
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div >
    )
}