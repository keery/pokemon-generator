import { Element } from "~@types/CardGenerator";
import { Card } from "~@types/Card";
import { ROUTE_GALLERY } from "~constants";
import { useTranslation } from "next-i18next";

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
  author: string;
  name: string;
  hp: string;
  element: Element;
  description: string;
  attack1Name: string;
  attack1Type: string;
  attack1Amount: string;
  attack1Damage: string;
  attack1Description: string;
  attack2Name: string;
  attack2Type: string;
  attack2Amount: string;
  attack2Damage: string;
  attack2Description: string;
}

export const formatValues = (values): FormatValue => {
  return {
    author: values.author,
    name: values.name,
    hp: values.hp.value,
    element: values.type.value,
    description: values.description || "",
    attack1Name: values.attack1Name || "",
    attack1Description: values.attack1Info || "",
    attack1Type: values.attack1Type?.value || "",
    attack1Amount: values.attack1Amount?.value || "",
    attack1Damage: values.attack1Damage?.value || "",
    attack2Name: values.attack2Name || "",
    attack2Description: values.attack2Info || "",
    attack2Type: values.attack2Type?.value || "",
    attack2Amount: values.attack2Amount?.value || "",
    attack2Damage: values.attack2Damage?.value || "",
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

export const formatAttackSeo = (label: string, values: string[]) => {
  const formattedValue = values.filter((v) => v !== "").join(" - ");

  if (formattedValue === "") return "";

  return ` ${label}: ${formattedValue}.`;
};

export const getSeoCardDescription = (card: Card) => {
  const { t } = useTranslation("gallery");

  const attack1 = formatAttackSeo(t("attack1"), [
    card.attack1Name,
    card.attack1Description,
  ]);
  const attack2 = formatAttackSeo(t("attack2"), [
    card.attack2Name,
    card.attack2Description,
  ]);

  return `${card.name} ${t("seo.modal.isType")} ${t(card.element)}.${
    card.description && card.description !== ""
      ? ` ${card.description}${
          card.description[card.description.length] !== "." ? "." : ""
        }`
      : ""
  }${attack1}${attack2} ${t("seo.modal.madeBy", { author: card.author })}`;
};

export const getHrefCardModal = (card: Card, layoutPrefix: string = "") => {
  return {
    href: `${ROUTE_GALLERY}?cardSlug=${card.slug}&idCard=${card.id}${
      layoutPrefix !== "" ? `&layoutPrefix=${layoutPrefix}` : ""
    }`,
    as: `${ROUTE_GALLERY}/${card.slug}/${card.id}`,
  };
};
