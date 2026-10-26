import { ShoppingCart, LayoutDashboard, Settings, ShelvingUnit, Store, LucideIcon, UsersRound } from "lucide-react"

export type SidebarItem = {
    id : string,
    labelKey: string;
    href : string,
    icon : LucideIcon
}

interface SidebarSection {
    titleKey: string;
    items: SidebarItem[];
}

export const sidebarSections: SidebarSection[] = [
    {
        titleKey: "sectionBranch",
        items: [
            { id: "Sell", labelKey: "sell", href: "/sell", icon: ShoppingCart },
            { id: "Dashboard", labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
            { id: "Inventory", labelKey: "inventory", href: "/inventory", icon: ShelvingUnit },
        ],
    },
    {
        titleKey: "sectionAdmin",
        items: [
            { id: "Branches", labelKey: "branches", href: "/branches", icon: Store },
            { id: "Users", labelKey: "users", href: "/users", icon: UsersRound },
            { id: "Settings", labelKey: "settings", href: "/settings", icon: Settings },
        ],
    },
];