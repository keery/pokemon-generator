import React from "react";
import { Flex, HStack, Text, StackDivider, Circle } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { HEADER_HEIGHT } from "~constants";
import nextSunday from "date-fns/nextSunday";
import set from "date-fns/set";
import { utcToZonedTime } from "date-fns-tz";
import { useCountdown, CountdownTime } from "~hooks/useCountdown";

const Item = ({ value, label }) => {
  return (
    <Flex alignItems="center">
      <Text mr={2}>{value < 10 ? "0" + value : value}</Text>
      <Text>{label}</Text>
    </Flex>
  );
};

const MarqueeContent = ({ children }) => {
  return (
    <>
      <Circle
        size="10px"
        background="linear-gradient(to right, #3390ed, #fba6ff)"
        mx="2rem"
        w="8rem"
        h="0.8rem"
      />
      <Text pr={2}>{" Next winner will get elected in "}</Text>
      <HStack
        w="fit-content"
        // py="0.5rem"
        px={0}
        borderRadius="1rem"
        spacing={3}
        divider={
          <StackDivider border="none" display="flex" alignItems="center">
            <Flex>:</Flex>
          </StackDivider>
        }
      >
        {children}
      </HStack>
    </>
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

  const countdown = useCountdown(now, formattedSunday);

  const content = getContent(countdown);

  return (
    <Flex
      direction="column"
      color="white"
      backgroundColor="rgb(255 255 255 / 17%)"
      backdropFilter="blur(7px)"
      pos="absolute"
      left="0"
      right="0"
      bottom={HEADER_HEIGHT * 1.2}
      py="0.3rem"
      fontSize="1.5rem"
    >
      <Marquee gradient={false} speed={90}>
        {/* We add MarqueeContent twice to take the entire screen width */}
        <MarqueeContent>{content}</MarqueeContent>
        <MarqueeContent>{content}</MarqueeContent>
      </Marquee>
    </Flex>
  );
};

export default Countdown;
