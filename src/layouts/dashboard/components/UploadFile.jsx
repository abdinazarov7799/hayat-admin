import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid, Text
} from "@chakra-ui/react";
import {URLS} from "../../../constants/url.js";
import React from "react";
import {useTranslation} from "react-i18next";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {useForm} from "react-hook-form";


const UploadFile = ({isOpen,onClose,}) => {
    const { t } = useTranslation();
    const { mutate, isLoading } = usePostQuery({});
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = (formData) => {
        const formDataWithFile = new FormData();
        formDataWithFile.append("file", formData.file[0]);
        mutate(
            {
                url: URLS.file_upload,
                attributes: formDataWithFile,
                config: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }},
            },
            {
                onSuccess: ({ data }) => {
                    onClose();
                },
            }
        );
    };
  return(
      <>
          <Modal
              isOpen={isOpen}
              onClose={onClose}
              size={{base: 'sm', md: 'xl'}}
          >
              <ModalOverlay />
              <ModalContent>
                  <ModalHeader>{t("Upload file")}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                          <SimpleGrid columns={{base: 1}} gap={5}>
                              <FormControl isInvalid={errors.file}>
                                  <FormLabel htmlFor="file">{t('File')}</FormLabel>
                                  <InputGroup>
                                      <Input
                                          type="file"
                                          id="file"
                                          accept=".pdf,.xls,.xlsx,.doc,.docx"
                                          {...register("file", {
                                              required: true,
                                          })}
                                          placeholder={t("file")}
                                      />
                                  </InputGroup>
                                  <FormErrorMessage>
                                      {errors.file && errors.file.message}
                                  </FormErrorMessage>
                              </FormControl>
                          </SimpleGrid>
                          <Button
                              mt={4}
                              isLoading={isSubmitting}
                              type="submit"
                              width={"100%"}
                              colorScheme={'blue'}
                          >
                              <Text color="white">{t("Upload")}</Text>
                          </Button>
                      </form>
                  </ModalBody>
                  <ModalFooter>
                      <Button onClick={onClose}>
                          {t('Back')}
                      </Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
      </>
  )
}
export default UploadFile;
