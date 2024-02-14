import React, { Fragment, useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery";
import { KEYS } from "../../../constants/key";
import { URLS } from "../../../constants/url";
import { find, get, isEqual, map } from "lodash";
import Pagination from "../../../components/pagination";
import { ContentLoader } from "../../../components/loader";
import LanguageForm from "../components/form/LanguageForm";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TranslationContainer = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [searchWord, setSearchWord] = useState(null);
  const [langKey, setLangKey] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = usePaginateQuery({
    key: KEYS.translations_list,
    url: URLS.translations_list,
    params: {
      params: {
        key: searchWord,
        size: 15,
      },
    },
    page,
  });

  const findLang = (translations = [], lang = "Ru") => {
    return find(translations, (item) => isEqual(get(item, "language"), lang));
  };

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <Fragment>
      <Box bg="white" w="100%" p={4} borderRadius="md">
        <InputGroup mt={2} mb={4}>
          <Input
            placeholder={"Search"}
            type={"text"}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <InputRightElement children={<FaSearch />} />
        </InputGroup>
        <Styled>
          <Table>
            <Thead>
              <Tr>
                <Th width={"25%"}>{t("Words")}</Th>
                <Th width={"25%"}>{t("UZ")}</Th>
                <Th width={"25%"}>{t("RU")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {map(get(data, "data.data.content", []), (item, i) => {
                return (
                  <Tr
                    onClick={() => {
                      setLangKey(item);
                      onOpen();
                    }}
                    key={get(item, 'id', i)}
                  >
                    <Td style={{ maxWidth: "", wordBreak: "break-all" }}>
                      {get(item, "key")}
                    </Td>
                    <Td style={{ maxWidth: "", wordBreak: "break-all" }}>
                      {get(
                        findLang(get(item, "languageSourcePs", []), "Uz"),
                        "translation"
                      )}
                    </Td>
                    <Td style={{ maxWidth: "", wordBreak: "break-all" }}>
                      {get(
                        findLang(get(item, "languageSourcePs", []), "Ru"),
                        "translation"
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Styled>
        <Pagination
          setPage={setPage}
          pageCount={get(data, "data.data.totalPages", 0)}
          page={0}
        />
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("Add Translations")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <LanguageForm langkey={langKey} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default TranslationContainer;
const Styled = styled.div`
  .action-button {
    justify-content: center;
    display: flex;
    gap: 5px;
    align-items: center;
    color: #0bc4ea;
    cursor: pointer;
  }
  tr {
    cursor: pointer;
  }
  .active {
    background: #acdee9;
  }
  th {
    background: #f2f2f2;
    text-align: left;
  }
  th:last-child {
    text-align: center;
  }
  td {
    padding: 10px 12px;
    font-size: 16px;
  }
`;
