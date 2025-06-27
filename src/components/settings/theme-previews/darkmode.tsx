import React from "react";

export const DarkMode = () => {
  return (
    <svg
      width="282"
      height="193"
      viewBox="0 0 282 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main window */}
      <path
        d="M0 15C0 6.71573 6.71573 0 15 0H267C275.284 0 282 6.71573 282 15V178C282 186.284 275.284 193 267 193H15C6.71573 193 0 186.284 0 178V15Z"
        fill="#0F172A"
      />
      
      {/* Title bar */}
      <path
        d="M28 42C28 33.7157 34.7157 27 43 27H242C250.284 27 257 33.7157 257 42V193H28V42Z"
        fill="#1E293B"
      />
      
      {/* Window controls */}
      <circle cx="45.5" cy="39.5" r="4.5" fill="#EF4444" />
      <circle cx="58.5" cy="39.5" r="4.5" fill="#F59E0B" />
      <circle cx="71.5" cy="39.5" r="4.5" fill="#10B981" />
      
      {/* Sidebar */}
      <path
        d="M28 42V193H136V42H43C34.7157 42 28 35.2843 28 27V42Z"
        fill="#1E293B"
      />
      
      {/* Sidebar items */}
      <rect x="44" y="67" width="61" height="17" rx="4" fill="#334155" />
      <rect x="44" y="88" width="61" height="17" rx="4" fill="#334155" />
      <rect x="44" y="110" width="61" height="17" rx="4" fill="#3B82F6" />
      <rect x="44" y="132" width="61" height="17" rx="4" fill="#334155" />
      
      {/* Main content area */}
      <path
        d="M137 42H242C250.284 42 257 48.7157 257 57V193H137V42Z"
        fill="#0F172A"
      />
      
      {/* Content card */}
      <rect x="147" y="67" width="100" height="110" rx="6" fill="#1E293B" />
      
      {/* Content header */}
      <rect x="157" y="77" width="80" height="6" rx="3" fill="#334155" />
      
      {/* Content items */}
      <rect x="157" y="90" width="60" height="4" rx="2" fill="#334155" />
      <rect x="157" y="98" width="80" height="4" rx="2" fill="#334155" />
      <rect x="157" y="106" width="70" height="4" rx="2" fill="#334155" />
      
      {/* Content divider */}
      <rect x="157" y="118" width="80" height="1" fill="#334155" />
      
      {/* Content list items */}
      <rect x="157" y="127" width="80" height="4" rx="2" fill="#3B82F6" />
      <rect x="157" y="135" width="80" height="4" rx="2" fill="#334155" />
      <rect x="157" y="143" width="80" height="4" rx="2" fill="#334155" />
      <rect x="157" y="151" width="80" height="4" rx="2" fill="#334155" />
      
      {/* Active state indicator */}
      <rect x="147" y="67" width="4" height="110" rx="2" fill="#3B82F6" />
      
      {/* Top right content */}
      <rect x="147" y="77" width="60" height="6" rx="3" fill="#3B82F6" />
      
      {/* Bottom status bar */}
      <rect x="0" y="178" width="282" height="15" fill="#0F172A" />
    </svg>
  );
};
