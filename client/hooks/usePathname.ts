import { usePathname as useNextPathname } from "next/navigation";
import { locales } from "../src/locales";

const usePathname = () => {
  const pathname = useNextPathname();

  const regexFromArray = new RegExp(locales.join("|"), "gi");

  const res = pathname.replace(/^\//, "").replace(regexFromArray, "");

  if (res === "") return "/";

  return res;
};

export default usePathname;
