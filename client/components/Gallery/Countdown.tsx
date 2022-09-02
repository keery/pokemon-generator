import React from "react";
import { Flex, HStack, Text, StackDivider, Circle } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { HEADER_HEIGHT } from "~constants";
import nextSunday from "date-fns/nextSunday";
import set from "date-fns/set";
import { utcToZonedTime } from "date-fns-tz";
import { useCountdown, CountdownTime } from "~hooks/useCountdown";
import { m, useTransform, useViewportScroll } from "framer-motion";
import { screenPercent } from "~utils/helper";

const Item = ({ value, label }) => {
  return (
    <Flex alignItems="center" direction="column">
      <Flex
        borderRadius="15px"
        width="110px"
        fontSize="70px"
        fontWeight={700}
        justifyContent="center"
        border="none"
        backgroundColor="rgb(64 77 145 / 34%)"
        color="#fff"
        // backdropFilter="blur(3px) saturate(191%)"
        backdropFilter="blur(3px)"
      >
        <Text>{value < 10 ? "0" + value : value}</Text>
      </Flex>
      <Text textTransform="uppercase" mt={2}>
        {label}
      </Text>
    </Flex>
  );
};

const getContent = ({ days, hours, minutes, seconds }: CountdownTime) => {
  const content = [];

  if (days > 0) {
    content.push(<Item key="countdown-day" label="days" value={days} />);
  }

  if (hours > 0) {
    content.push(<Item key="countdown-hour" label="hours" value={hours} />);
  }

  if (minutes > 0) {
    content.push(
      <Item key="countdown-minute" label="minutes" value={minutes} />
    );
  }

  if (seconds > 0) {
    content.push(
      <Item key="countdown-second" label="seconds" value={seconds} />
    );
  }

  return content;
};

const Countdown = () => {
  const now = utcToZonedTime(new Date(), "Europe/Paris");
  const sunday = utcToZonedTime(nextSunday(new Date()), "Europe/Paris");
  const formattedSunday = set(sunday, { hours: 20, minutes: 0, seconds: 0 });
  const { days, hours, minutes, seconds } = useCountdown(now, formattedSunday);
  // const content = getContent(countdown);

  const { scrollY } = useViewportScroll();

  const y = useTransform(
    scrollY,
    [screenPercent(50), screenPercent(50), screenPercent(100)],
    [screenPercent(0), screenPercent(-10), screenPercent(13)]
  );

  return (
    <Flex
      layerStyle="glass"
      border="none"
      display="inline-flex"
      borderRadius="11px"
      marginLeft="30px"
      p="20px"
      position="absolute"
      top="370px"
    >
      <HStack spacing={4}>
        <Item key="countdown-day" label="days" value={days} />
        <Item key="countdown-hour" label="hours" value={hours} />
        <Item key="countdown-minute" label="minutes" value={minutes} />
        <Item key="countdown-second" label="seconds" value={seconds} />
      </HStack>
    </Flex>
  );
};

export default Countdown;
