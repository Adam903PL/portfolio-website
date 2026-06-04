const X_ROBOTS_TAG_VALUE = 'noindex, follow';

type RouteHandler<TArgs extends unknown[]> = (
  ...args: TArgs
) => Response | Promise<Response>;

export function withNoindexHeader<TArgs extends unknown[]>(
  handler: RouteHandler<TArgs>,
) {
  return async (...args: TArgs): Promise<Response> => {
    const response = await handler(...args);
    response.headers.set('X-Robots-Tag', X_ROBOTS_TAG_VALUE);
    return response;
  };
}
