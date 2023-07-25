export const getDataFromSearchParam = (fullURLasString) => {
  const { search } = new URL(fullURLasString);
  const searchParams = new URLSearchParams(search);

  const onlyKeys = Array.from(searchParams.keys());

  const asObject = [...searchParams.entries()].reduce((finalObject, contentAsArray) => {
    const [key, value] = contentAsArray;
    finalObject[key] = value;
    return finalObject;
  }, {});

  return { asObject, onlyKeys };
};
