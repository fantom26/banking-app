export const isActiveRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`)
