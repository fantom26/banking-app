import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

// Wrappers around Next.js' navigation APIs that add the locale prefix from the routing config
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
