'use client'

import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathName = usePathname()

  return (
    <aside className="sidebar">
        <nav className="flex flex-col gap-4"
        >
            <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2" >
                <Image src="/icons/logo.svg" className="size-[24px] max-xl:size-14" width={34} height={34} alt="Horizon logo"/>
                <h2 className="sidebar-logo">Horizon</h2>
            </Link>

            {sidebarLinks.map((link) => {
                const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)
               return <Link key={link.label} href={link.route} className={cn('sidebar-link', {'bg-bank-gradient': isActive})}>
                    <Image className={cn({'brightness-[3] invert-0': isActive})} src={link.imgURL} width={24} height={24} alt={link.label} />
                    <p className={cn('sidebar-label', {'text-white!': isActive})}>{link.label}</p>
                </Link>
})}
        </nav>
    </aside>
  )
}

export default Sidebar