import Image from 'next/image';
import React, { memo } from 'react';

export const PortalBanner = memo(function PortalBanner() {
  return (
    <div className="w-full bg-muted flex justify-center py-5">
      <Image
        src="/images/logo.png"
        alt="LOGO"
        width={100}
        height={40}
        priority
        loading="eager"
        className="h-auto w-[100px]"
      />
    </div>
  );
});

PortalBanner.displayName = 'PortalBanner';