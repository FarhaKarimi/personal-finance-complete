
import React from 'react';

interface IconProps {
    className?: string;
}

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
    </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
    </svg>
);

export const BanknotesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v.75A.75.75 0 014.5 8.25h-.75m0 0h.75a.75.75 0 01.75.75v.75m0 0H3m9 3.75h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0h-.75a.75.75 0 01-.75-.75v-.75m0 0v-.75A.75.75 0 0112 12h.75m0 0h.75a.75.75 0 01.75.75v.75m0 0h-.75m9-3.75h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75m0 0h-.75a.75.75 0 01-.75-.75v-.75m0 0v-.75a.75.75 0 01.75-.75h.75M3 12h18M3 15h18" />
    </svg>
);

export const PencilIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const ChartPieIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

export const Cog6ToothIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.962a8.515 8.515 0 01.373.067m-.067-.373a8.503 8.503 0 013.959 5.833M16.5 9.594c.542-.09.962-.56 1.007-1.11a8.515 8.515 0 00-.067-.373m.373.067a8.503 8.503 0 00-5.833-3.959m0 0v-2.083a1.125 1.125 0 011.125-1.125h.063a1.125 1.125 0 011.125 1.125v2.083m-6.002 0v-2.083a1.125 1.125 0 011.125-1.125h.063a1.125 1.125 0 011.125 1.125v2.083m6.364 12.002c.09.542.56 1.007 1.11.962a8.515 8.515 0 00.373-.067m-.067.373a8.503 8.503 0 00-3.959-5.833M4.5 14.406c-.542.09-.962.56-1.007 1.11a8.515 8.515 0 01.067.373m-.373-.067a8.503 8.503 0 015.833 3.959m0 0v2.083a1.125 1.125 0 001.125 1.125h.063a1.125 1.125 0 001.125-1.125v-2.083m-6.002 0v2.083a1.125 1.125 0 001.125 1.125h.063a1.125 1.125 0 001.125-1.125v-2.083m-6.364-12.002c-.09-.542-.56-1.007-1.11-.962a8.515 8.515 0 00-.373.067m.067-.373a8.503 8.503 0 003.959-5.833M12 18a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
);
