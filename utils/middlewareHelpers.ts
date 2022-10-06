import { NextRequest } from "next/server";
import { Pages, privatePages, publicPages } from "routes/Routes";

export enum RequestPathType {
  PRIVATE,
  PUBLIC,
  NEXT_INTERNAL,
}

export function requestPathType(request: NextRequest) {
  const isPublic = publicPages.some((pagePath) => {
    return request.nextUrl.pathname.startsWith(pagePath);
  });

  if (isPublic) return RequestPathType.PUBLIC;

  const isPrivate = privatePages.some((pagePath) => {
    if (pagePath === Pages.OVERVIEW)
      return request.nextUrl.pathname === pagePath;
    return request.nextUrl.pathname.startsWith(pagePath);
  });

  if (isPrivate) return RequestPathType.PRIVATE;

  return RequestPathType.NEXT_INTERNAL;
}

export function hasAuthCookie(request: NextRequest) {
  const userTokenCookie = request.cookies.get("userToken");
  return Boolean(userTokenCookie);
}
