import React, { useRef } from "react";
import { Flex, HStack, Text, StackDivider, Circle } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { HEADER_HEIGHT } from "~constants";
import nextSunday from "date-fns/nextSunday";
import set from "date-fns/set";
import { utcToZonedTime } from "date-fns-tz";
import { useCountdown } from "~hooks/useCountdown";
import { m, useTransform, useViewportScroll } from "framer-motion";
import { screenPercent } from "~utils/helper";

const Item = ({ value, label }) => {
  return (
    <Flex alignItems="center" direction="column">
      <Flex
        width="115px"
        fontSize="120px"
        fontWeight={700}
        justifyContent="center"
        border="none"
        color="#fff"
        fontFamily="tusker"
      >
        <Text>{value < 10 ? "0" + value : value}</Text>
      </Flex>
      <Text
        textTransform="uppercase"
        mt="-24px"
        color="white"
        fontWeight="700"
        padding="1px 10px"
        borderRadius="7px"
      >
        {label}
      </Text>
    </Flex>
  );
};

const Countdown = () => {
  const sunday = utcToZonedTime(nextSunday(new Date()), "Europe/Paris");
  const formattedSunday = set(sunday, { hours: 20, minutes: 0, seconds: 0 });
  const { days, hours, minutes, seconds } = useCountdown(formattedSunday);
  const { scrollY } = useViewportScroll();

  const y = useTransform(
    scrollY,
    [screenPercent(50), screenPercent(50), screenPercent(100)],
    [screenPercent(0), screenPercent(-10), screenPercent(13)]
  );

  return (
    <Flex
      border="none"
      display="inline-flex"
      mt="-70px"
      position="absolute"
      top="370px"
    >
      <HStack
        spacing={4}
        divider={
          <StackDivider
            border="none"
            display="flex"
            alignItems="center"
            fontSize="55px"
            margin="0"
            marginLeft="8px!important"
            marginRight="9px!important"
          >
            <Flex color="white">:</Flex>
          </StackDivider>
        }
      >
        <Item key="countdown-day" label="days" value={days} />
        <Item key="countdown-hour" label="hours" value={hours} />
        <Item key="countdown-minute" label="minutes" value={minutes} />
        <Item key="countdown-second" label="seconds" value={seconds} />
      </HStack>
    </Flex>
  );
};

export default Countdown;
