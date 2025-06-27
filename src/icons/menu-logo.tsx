import React from 'react'
import Image from 'next/image'

type MenuLogoProps = {
  onClick(): void
}

export const MenuLogo = ({ onClick }: MenuLogoProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Image
        src="/images/chatsol logo .png"
        alt="Chatsol Logo"
        width={30}
        height={30}
        className="object-contain"
      />
    </div>
  )
}
