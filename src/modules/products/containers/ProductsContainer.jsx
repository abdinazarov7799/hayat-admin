import Pagination from "../../../components/pagination/index.jsx";
import React, {useState} from "react";
import {get, isArray, isEmpty} from "lodash";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Flex,
    Heading,
    useDisclosure,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Input,
    InputRightElement,
    InputGroup,
    Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton,
} from "@chakra-ui/react";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from "react-icons/ai";
import {CreateItem} from "../../../components/CreateItem.jsx";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {OverlayLoader} from "../../../components/loader/index.js";
import {UpdateItem} from "../../../components/UpdateItem.jsx";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {FaSearch} from "react-icons/fa";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import Swal from "sweetalert2";


const ProductsContainer = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [itemData, setItemData] = useState(null);
    const [key,setKey] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:updateIsOpen, onOpen:updateOnOpen, onClose:updateOnClose } = useDisclosure();
    const {data,isLoading,isFetching,refetch} = usePaginateQuery({
        key: KEYS.product_get_all,
        url: URLS.product_get_all,
        params: {
            params: {
                size,
                name: key
            }
        },
        page
    });
    const headData = get(data,'data.data',{});
    const { mutate } = useDeleteQuery({
        listKeyId: KEYS.product_get_all
    });

    const useDelete = (id) => {
        Swal.fire({
            title: t("O'chirishga ishonchigiz komilmi?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#e22f2f",
            confirmButtonText: t("Ha"),
            cancelButtonText: t("Qaytish"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({url: `${URLS.product_delete}/${id}`})
            }
        });
    }
    return(
        <>
            <Box bg={'white'} p={4} width="100%" borderRadius="md">
                <Flex alignItems={"center"}>
                    <Heading mr={4}>{t('Products')}</Heading>
                    <Button
                        variant='outline'
                        colorScheme={'blue'}
                        leftIcon={<AiOutlinePlus />}
                        onClick={onOpen}
                    >
                        {t("New product")}
                    </Button>
                    <CreateItem
                        isOpen={isOpen}
                        onClose={onClose}
                        refetch={refetch}
                        title={'Create new product'}
                        url={URLS.product_add}
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
                                <Th>{t("category name UZ")}</Th>
                                <Th>{t("category name RU")}</Th>
                                <Th>{t("Edit")}</Th>
                                <Th>{t("Delete")}</Th>
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
                                        >
                                            <Td>{get(item, "number", "-")}</Td>
                                            <Td>{get(item, "nameUz", "-")}</Td>
                                            <Td>{get(item, "nameRu", "-")}</Td>
                                            <Td>{get(item, "category.nameUz", "-")}</Td>
                                            <Td>{get(item, "category.nameRu", "-")}</Td>
                                            <Td><IconButton icon={<AiOutlineEdit />}  onClick={() => {
                                                setItemData(item)
                                                updateOnOpen()
                                            }} /></Td>
                                            <Td><IconButton colorScheme={'red'} icon={<AiOutlineDelete />} onClick={() => useDelete(get(item,'id',''))} /></Td>
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
            <Modal
                isOpen={updateIsOpen}
                onClose={updateOnClose}
                size={{base: 'sm', md: 'xl'}}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("Edit product")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UpdateItem
                            itemData={itemData}
                            listKeyId={KEYS.product_get_all}
                            url={URLS.product_edit}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={updateOnClose}>
                            {t('Back')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ProductsContainer
