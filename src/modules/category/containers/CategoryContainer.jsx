import Pagination from "../../../components/pagination/index.jsx";
import React, {useState} from "react";
import {get, isArray, isEmpty} from "lodash";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Flex,
    Heading,
    useDisclosure, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Input, InputRightElement, InputGroup,
} from "@chakra-ui/react";
import {AiOutlinePlus} from "react-icons/ai";
import {CreateItem} from "../../../components/CreateItem.jsx";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {OverlayLoader} from "../../../components/loader/index.js";
import {UpdateItem} from "../../../components/UpdateItem.jsx";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {FaSearch} from "react-icons/fa";


const CategoryContainer = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [itemData, setItemData] = useState(null);
    const [key,setKey] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:updateIsOpen, onOpen:updateOnOpen, onClose:updateOnClose } = useDisclosure();
    const {data,isLoading,isFetching,refetch} = usePaginateQuery({
        key: KEYS.category_get_all,
        url: URLS.category_get_all,
        params: {
            params: {
                size,
                key
            }
        },
        page
    });
    const headData = get(data,'data.data',{});

    return(
      <>
          <Box bg={'white'} p={4} width="100%" borderRadius="md">
              <Flex alignItems={"center"}>
                  <Heading mr={4}>{t('Category')}</Heading>
                  <Button
                      variant='outline'
                      colorScheme={'blue'}
                      leftIcon={<AiOutlinePlus />}
                      onClick={onOpen}
                  >
                      {t("New category")}
                  </Button>
                  <CreateItem
                      isOpen={isOpen}
                      onClose={onClose}
                      refetch={refetch}
                      title={'Create new category'}
                      url={URLS.category_add}
                  />
              </Flex>
              <InputGroup mt={3} mb={4}>
                  <Input
                      placeholder={t("Search")}
                      type={"text"}
                      onChange={(e) => setKey(e.target.value)}
                  />
                  <InputRightElement children={<FaSearch />} />
              </InputGroup>

              <TableContainer mt={6}>
                  {isLoading && <OverlayLoader />}
                  <Table colorScheme="gray" size={"md"} >
                      <Thead>
                          <Tr>
                              <Th>{t("Ordinal number")}</Th>
                              <Th>{t("name UZ")}</Th>
                              <Th>{t("name RU")}</Th>
                          </Tr>

                      </Thead>
                      {
                          (isEmpty(get(headData,'content',[])) && isArray(get(headData,'content',[]))) ? (
                              <span style={{ padding: "10px", margin: "10px", textAlign: "center" }}>
                                    {t("No Data")}
                                </span>
                          ) : (
                              <Tbody>
                                  {get(headData, "content", []).map((item, i) => (
                                      <Tr
                                          key={i + 1}
                                          _hover={{backgroundColor: '#f3f3f3'}}
                                          cursor={"pointer"}
                                          onClick={() => {
                                              setItemData(item)
                                              updateOnOpen()
                                          }}
                                      >
                                          <Td>{get(item, "number", "-")}</Td>
                                          <Td>{get(item, "nameUz", "-")}</Td>
                                          <Td>{get(item, "nameRu", "-")}</Td>
                                      </Tr>
                                  ))}
                              </Tbody>
                          )}
                      <Tfoot />
                  </Table>
              </TableContainer>
              <Pagination
                  setPage={setPage}
                  pageCount={get(headData, "totalPages", 1)}
                  page={page}
              />
          </Box>
          <UpdateItem
              isOpen={updateIsOpen}
              onClose={updateOnClose}
              itemData={itemData}
              title={"Edit category"}
              listKeyId={KEYS.category_get_all}
              url={URLS.category_edit}
          />
      </>
  )
}
export default CategoryContainer
