import React from "react";
import { Flex, HStack, Text, StackDivider } from "@chakra-ui/react";
import nextSunday from "date-fns/nextSunday";
import set from "date-fns/set";
import { utcToZonedTime } from "date-fns-tz";
import { useCountdown } from "~hooks/useCountdown";
import { useTranslations } from "next-intl";

const Item = ({ value, label }) => {
  return (
    <Flex
      alignItems="center"
      direction="column"
      textShadow="0 0 7px rgb(73 73 73 / 41%)"
      width={{ base: "3.35rem", sm: "5.2rem", md: "7rem", lg: "9rem" }}
    >
      <Flex justifyContent="center" border="none">
        <Text>{value < 10 ? "0" + value : value}</Text>
      </Flex>
      <Text
        textTransform="uppercase"
        color="white"
        fontWeight="700"
        padding="1px 10px"
        borderRadius="7px"
        fontSize={{ base: "0.7rem", sm: "0.8rem" }}
      >
        {label}
      </Text>
    </Flex>
  );
};

const Countdown = () => {
  const t = useTranslations();
  const sunday = utcToZonedTime(nextSunday(new Date()), "Europe/Paris");
  const formattedSunday = set(sunday, { hours: 20, minutes: 0, seconds: 0 });
  const { days, hours, minutes, seconds } = useCountdown(formattedSunday);

  return (
    <Flex
      border="none"
      display="inline-flex"
      transform={{
        base: "translateX(0rem)",
        md: "translateX(4rem)",
      }}
    >
      <HStack
        spacing={4}
        divider={
          <StackDivider
            border="none"
            display="flex"
            alignItems="center"
            fontSize={{ base: "1.6rem", sm: "2rem", md: "3rem" }}
            margin="0"
            marginLeft="8px!important"
            marginRight="9px!important"
          >
            <Flex color="white">:</Flex>
          </StackDivider>
        }
      >
        <Item key="countdown-day" label={t("countdown.days")} value={days} />
        <Item key="countdown-hour" label={t("countdown.hours")} value={hours} />
        <Item
          key="countdown-minute"
          label={t("countdown.minutes")}
          value={minutes}
        />
        <Item
          key="countdown-second"
          label={t("countdown.seconds")}
          value={seconds}
        />
      </HStack>
    </Flex>
  );
};

export default Countdown;
