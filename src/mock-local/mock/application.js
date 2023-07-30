export const mock = (url, handlers) => {
  const urlObject = new URL(url);
  const { pathname, search } = urlObject;

  const path = pathname + search;

  const { body, status } = handlers?.[path];

  const response = new Response(JSON.stringify(body), {
    status: status || 200,
  });

  return response;
};
