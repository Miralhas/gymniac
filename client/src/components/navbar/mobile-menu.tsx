import { BookOpenText, HistoryIcon, UserIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { LEFT_SIDE_NAV_LINKS, NavLink } from ".";
import { RefObject } from "react";

type MobileMenuProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
}

const MobileMenu = ({ containerRef, toggleMenu }: MobileMenuProps) => {
  return (
    <motion.div
      className="bg-card w-full border border-t-3 absolute z-10 origin-top-right lg:hidden shadow-2xl"
      initial={{ opacity: 0, scaleY: 0, scaleX: 1 }}
      animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
      exit={{ opacity: 0, scaleY: 0, scaleX: 1 }}
      transition={{ duration: .5, type: "spring" }}
      ref={containerRef}
      key="modal"
    >
      <ul className="p-4 text-foreground/70 flex flex-col gap-1" onClick={toggleMenu}>

        {LEFT_SIDE_NAV_LINKS.map((link) => (
          <li key={link.title}>
            <NavItem {...link} />
          </li>
        ))}

        <Separator className="my-2" />

        <li>
          <NavItem href="/profile" title="Profile" icon={UserIcon} />
        </li>
      </ul>
    </motion.div>
  )
}

const NavItem = (link: NavLink) => {
  return (
    <Link href={link.href} className="flex items-center gap-2 relative text-base text-[15px] font-light tracking-wide text-foreground/80 hover:text-foreground ease-in duration-200 w-full transition-colors p-2 hover:bg-primary/10 hover:rounded-sm hover:border hover:border-primary/60 leading-0">
      {link.icon ? <link.icon className="size-5 " /> : null}
      {link.title}
    </Link>
  )
}

export default MobileMenu;
