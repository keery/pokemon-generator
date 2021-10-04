import React, { useEffect } from "react";
import { cacheCard } from "~utils/cache";
import { useWatch, useFormContext } from "react-hook-form";

const CacheForm = () => {
  const { control } = useFormContext();
  const formValues = useWatch({
    control,
  });

  useEffect(() => {
    cacheCard(formValues);
  }, [formValues]);

  return <></>;
};

export default CacheForm;
