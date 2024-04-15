"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "~src/components/Interactive/ModalInteractiveArea";
import FieldsLengthWeight from "~src/components/Fields/FieldsLengthWeight";
import { useForm, FormProvider } from "react-hook-form";

const SegmentModal = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push(
  //     `/?modal=${router.query?.idModal}`,
  //     `/modal/${router.query?.idModal}`,
  //     { shallow: true }
  //   );
  // }, [router.query?.idModal]);
  // return <div>dskjfhsdkj</div>;
  return (
    <Modal isOpen name={"tets"} onClose={() => null}>
      <FieldsLengthWeight isModal />
    </Modal>
  );
};

// export const getServerSideProps: GetServerSideProps<SSRConfig> = async ({
//   locale,
// }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common", "generator"])),
//     },
//   };
// };

export default SegmentModal;
