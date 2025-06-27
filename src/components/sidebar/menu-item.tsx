import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  path?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, path, icon, label, current, onSignOut }: Props) => {
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg my-1 transition-colors duration-200',
            'hover:bg-gray-800/50 dark:hover:bg-gray-700/70',
            !current
              ? 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              : current === path
              ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400 ml-[-4px] pl-[calc(1rem-4px)]'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          )}
          href={path ? `/${path}` : '#'}
        >
          <span className={cn(
            'flex-shrink-0',
            current === path ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
          )}>
            {icon}
          </span>
          <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            {label}
          </span>
        </Link>
      )
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'p-2.5 my-1 rounded-lg flex items-center justify-center transition-colors duration-200',
            'hover:bg-gray-800/50 dark:hover:bg-gray-700/70',
            current === path 
              ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          )}
          href={path ? `/${path}` : '#'}
          title={label}
        >
          <span className={cn(
            'flex-shrink-0',
            current === path ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
          )}>
            {icon}
          </span>
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem