import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { useQueryClient, InfiniteData } from "react-query";
import { CachedQuery, Card } from "~@types";
import CardModalArrow from "~components/Gallery/CardModal/CardModalArrow";
import Prev from "public/assets/img/chevron-left.svg";
import Next from "public/assets/img/chevron-right.svg";

interface Props {
  cachedQuery: CachedQuery;
  setAnimation: (anim: string) => void;
}

const CardModalArrows = ({ cachedQuery, setAnimation }: Props) => {
  const [arrowAnimation, setArrowAnimation] = useState("first");
  const { key, indexCard, indexPage } = cachedQuery;

  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<InfiniteData<Card[]>>(key);
  const isPrevDisabled = indexPage === 0 && indexCard === 0;
  const isNextDisabled =
    !data.pages[indexPage + 1] && !data.pages[indexPage][indexCard + 1];

  const onPrev = () => {
    const newModal = {
      card: null,
      cachedQuery: {
        ...cachedQuery,
      },
    };

    if (indexCard === 0) {
      const newIndexPage = indexPage - 1;
      const newIndexCard = data.pages[newIndexPage].length - 1;
      newModal.cachedQuery.indexPage = newIndexPage;
      newModal.cachedQuery.indexCard = newIndexCard;
      newModal.card = data.pages[newIndexPage][newIndexCard];
    } else {
      const newIndexCard = indexCard - 1;
      newModal.cachedQuery.indexCard = newIndexCard;
      newModal.card = data.pages[indexPage][newIndexCard];
    }
    return newModal;
  };

  const onNext = () => {
    const newModal = {
      card: null,
      cachedQuery: {
        ...cachedQuery,
      },
    };

    if (data.pages[indexPage][indexCard + 1]) {
      const newIndexCard = indexCard + 1;
      newModal.cachedQuery.indexCard = newIndexCard;
      newModal.card = data.pages[indexPage][newIndexCard];
    } else {
      const newIndexPage = indexPage + 1;
      const newIndexCard = 0;
      newModal.cachedQuery.indexPage = newIndexPage;
      newModal.cachedQuery.indexCard = newIndexCard;
      newModal.card = data.pages[newIndexPage][newIndexCard];
    }

    return newModal;
  };

  return (
    <>
      <CardModalArrow
        isDisabled={isPrevDisabled}
        onClick={onPrev}
        setModalAnimation={setAnimation}
        arrowAnimation={arrowAnimation}
        setArrowAnimation={setArrowAnimation}
        direction="prev"
      >
        <Icon as={Prev} transform="translateX(-0.6rem)" />
      </CardModalArrow>

      <CardModalArrow
        isDisabled={isNextDisabled}
        onClick={onNext}
        setModalAnimation={setAnimation}
        setArrowAnimation={setArrowAnimation}
        arrowAnimation={arrowAnimation}
        direction="next"
      >
        <Icon as={Next} transform="translateX(-0.6rem)" />
      </CardModalArrow>
    </>
  );
};

export default CardModalArrows;
