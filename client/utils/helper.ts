import { RgbaColor } from "react-colorful";
import { useRouter } from "next/navigation";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-GB";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getRgbaColor = (color: RgbaColor): string => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${
    typeof color.a === "undefined" ? 1 : color.a
  })`;
};

export const observeFieldResize = (
  field,
  fullWidth: number,
  fontSize: number
) => {
  new ResizeObserver(() => {
    if (!field) return;
    field.style.fontSize = (field.clientWidth / fullWidth) * fontSize + "px";
  }).observe(field);
};

export const setUrlModal = (name: string, router: AppRouterInstance) => {
  // router.push({ pathname: "/modal/[idModal]", query: { idModal: name } },{ shallow: true }));
  router.push(`modal`);
};

export const openModalWithUrl = (
  name: string,
  open: () => void,
  router: AppRouterInstance
): void => {
  router.push("/fr/modal/species");
  // setUrlModal(name, router);
  // open();
};

export const closeModalWithUrl = (close: () => void): void => {
  const router = useRouter();
  router.push(`/`, undefined, { shallow: true });
  close();
};

export const screenPercent = (percent: number) => {
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  return (windowHeight * percent) / 100;
};

const locales = {
  fr,
  en,
};

export const dateToText = (date, language) => {
  return format(new Date(date), "dd MMMM yyyy", {
    locale: locales[language] || en,
  }).toLowerCase();
};
