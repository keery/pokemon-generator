import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Text } from "react-konva";

const CollectionNumber = ({ control }) => {
  const [totalCollection, cardNumber] = useWatch({
    control,
    name: ["cardNumber", "totalCollection"],
  });

  const number = useMemo(() => {
    let value = cardNumber;
    if (totalCollection !== "") {
      if (cardNumber !== "") value += "/";
      value += totalCollection;
    }
    return value;
  }, [cardNumber, totalCollection]);

  if (!Boolean(number)) return null;

  return (
    <Text
      text={number}
      fontFamily="pokename"
      width={52}
      height={12}
      wrap="none"
      fontSize={12}
      align="right"
      y={664}
      x={400}
    />
  );
};

export default CollectionNumber;
