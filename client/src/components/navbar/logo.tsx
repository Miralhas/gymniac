'use client'

import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="transition-opacity items-center ease-in duration-200 flex gap-1.5 hover:opacity-80">
      <p className="text-lg sm:text-2xl uppercase tracking-widest bg-linear-to-r from-accent/90 to-primary/70 bg-clip-text text-transparent font-tilt-warp">
        GYMNIAC
      </p>
    </Link>
  )
}

export default Logo;
