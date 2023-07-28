export const mock = (url, handlers) => {
  const urlObject = new URL(url);
  const path = urlObject.pathname;

  const { body, status } = handlers?.[path];

  const response = new Response(JSON.stringify(body), {
    status: status || 200,
  });

  return response;
};
