export const printCard = () => {
  window.print();
};

export const exportCard = () => {
  const date = new Date();

  let name = `pokemon-card`;
  name += `-${date.getFullYear()}`;
  name += `-${date.getMonth()}`;
  name += `-${date.getDate()}`;
  name += `-${date.getHours()}`;
  name += `-${date.getMinutes()}`;
  name += `-${date.getSeconds()}`;
  name += `.png`;

  const link = document.createElement("a");
  link.download = name;
  link.href = getCardData();
  link.click();
};

export interface FormatValue {
  name: string;
  description: string;
  attack1Name: string;
  attack1Description: string;
  attack2Name: string;
  attack2Description: string;
}
export const formatValues = (values): FormatValue => {
  return {
    name: values.name,
    description: values.description || "",
    attack1Name: values.attack1Name || "",
    attack1Description: values.attack1Info || "",
    attack2Name: values.attack2Name || "",
    attack2Description: values.attack2Info || "",
  };
};

export const getCardData = () => {
  const canva = document.getElementById("card");
  // @ts-ignore
  return canva.toDataURL();
};

export const getImgFromCard = () => {
  const dataUrl = getCardData();

  return fetch(dataUrl)
    .then((res) => res.blob())
    .then((blob) => {
      return new File([blob], "card", { type: "image/jpg" });
    });
};

export const getPublishData = async (formValues) => {
  const formData = new FormData();
  const img = await getImgFromCard();
  const formattedValues = formatValues(formValues);

  formData.append("img", img);
  Object.keys(formattedValues).map((key) => {
    formData.append(key, formattedValues[key]);
  });
  return formData;
};
