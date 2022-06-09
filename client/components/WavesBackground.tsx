import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Wave1 from "public/assets/img/waves/wave1.svg";
import Wave2 from "public/assets/img/waves/wave2.svg";
import Wave3 from "public/assets/img/waves/wave3.svg";

// New color palette:
// Bleu clair: #52a4ff
// Bleu foncé: #1156bd
// Bleu très foncé: #1d1741
// Beige: #fca0a1
// Rouge: #e94a44

// Site reference: https://insidethehead.co/chapters#family
// Mettre un compteur avant les prochaines elections de carte

const WavesBackground = () => {
  return (
    <Flex
      overflow="hidden"
      pos="absolute"
      h="100vh"
      left="0"
      right="0"
      bottom="0"
      top="0"
      background="linear-gradient(189.16deg, #8be1ff 13.57%, #ffffff 98.38%)"
    >
      <Box pos="absolute" w="100%" h="100%" top="30%" left="-10%">
        <Wave1
          // fill="#52a4ff"
          fill="#ffcd04"
        />
      </Box>
      <Box backdropFilter="blur(60px)" w="100%" h="100%" pos="absolute" />
      <Box pos="absolute" w="110%" h="100%" top="22%" left="-10%">
        <Wave2
          width="100%"
          height="auto"
          // fill="url(#a)"
          fill="#52a4ff"
        />
      </Box>
      <Box pos="absolute" w="110%" h="100%" top="35%" left="-10%">
        <Wave2
          width="100%"
          height="auto"
          // fill="url(#a)"
          fill="#0d4aa6"
        />
      </Box>
      {/* <Box
        pos="absolute"
        w="100%"
        h="100%"
        background="linear-gradient(rgb(46 100 184) -18.72%, #0d4aa6 37.6%)"
        // background="linear-gradient(rgba(31, 31, 71, 0.25) -18.72%, #1156bd 37.6%)"

        top="65%"
        clipPath="url(#clip)"
      >
        <Wave3 />
      </Box> */}
    </Flex>
  );
};

export default WavesBackground;
