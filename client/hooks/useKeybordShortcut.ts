import { useEffect } from "react";
import Mousetrap from "mousetrap";
import { useBreakpointValue } from "@chakra-ui/react";

interface Props {
  keyboardShortcut: string[];
  callback: () => any;
  isDisabled: boolean;
}

const useKeybordShortcut = ({
  callback,
  isDisabled,
  keyboardShortcut,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  useEffect(() => {
    if (isMobile) return;
    const shortcut = keyboardShortcut.join("+").toLowerCase();
    Mousetrap.bind(shortcut, (event) => {
      if (!isDisabled) {
        callback();
      }
    });
    return () => {
      Mousetrap.unbind(shortcut);
    };
  }, [isMobile, isDisabled, callback]);
};

export default useKeybordShortcut;
