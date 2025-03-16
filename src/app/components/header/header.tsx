'use client'
import Link from "next/link";
import styles from './header.module.css';
import { usePathname } from "next/navigation";

const routes = [
    {
        name: "Dashboard",
        href: "/dashboard"
    },
    {
        name: "Inventory",
        href: "/inventory"
    }
]

export default function Header() {
    const path = usePathname();
    return <header>
        <nav style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            {routes && routes.map(r => {
                const active = r.href == path
                return <Link className={`${active && styles.active}`} href={r.href}>{r.name}</Link>
            })}
        </nav>
    </header>
}