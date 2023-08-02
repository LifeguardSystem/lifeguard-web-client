export const inserTextToDOMElement = (params: {
  domElement: HTMLElement;
  value: string;
}) => {
  const { domElement, value } = params;

  domElement.innerText = value;
};
