import {
    Button,
    Heading, Icon,
    IconButton, Input, InputGroup, InputRightElement,
    Stack,
    Table, TableContainer, Tbody, Td,
    Th, Thead, Tr,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {get, isArray, isEmpty} from "lodash";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import Pagination from "../../../components/pagination/index.jsx";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import NoData from "../../../components/NoData/index.jsx";
import {TbLock, TbLockOpen, TbX, TbCheck} from "react-icons/tb";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {FaSearch} from "react-icons/fa";


const UserList = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [key,setKey] = useState();

    const {data,isLoading,refetch} = usePaginateQuery({
        key: KEYS.user_get_all,
        url: URLS.user_get_all,
        params: {
            params: {
                size,
                search: key
            }
        },
        page
    });

    const {mutate:blockMutate} = usePostQuery({
        listKeyId: KEYS.user_get_all,
    })
    const {mutate:unBlockMutate} = usePostQuery({
        listKeyId: KEYS.user_get_all,
    })

    const blockUser = (id) => {
        Swal.fire({
            title: t("Do you want to block the user?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#e22f2f",
            confirmButtonText: t("Yes"),
            cancelButtonText: t("Back"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                blockMutate({url: `${URLS.user_block}/${id}`},{
                    onSuccess: () => {
                        refetch();
                    }
                });
            }
        });
    };
    const unBlockUser = (id) => {
        Swal.fire({
            title: t("Do you want to unblock the user?"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#0fab17",
            confirmButtonText: t("Yes"),
            cancelButtonText: t("Back"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                unBlockMutate({url: `${URLS.user_unblock}/${id}`},{
                    onSuccess: () => {
                        refetch();
                    }
                });
            }
        });
    };
    const headData = get(data,'data.data',{})

    return(
        <>
            <Heading size={'md'} mb={6}>{t('Telegram users')}</Heading>
            <InputGroup mt={3} mb={4}>
                <Input
                    placeholder={t("Search")}
                    type={"text"}
                    onChange={(e) => setKey(e.target.value)}
                />
                <InputRightElement children={<FaSearch />} />
            </InputGroup>
            <Stack>
                {
                    (!isEmpty(get(headData,'content',[])) &&
                        isArray(get(headData,'content',[]))) ?
                    (
                        <TableContainer>
                            <Table colorScheme="gray" size={"md"}>
                                <Thead>
                                    <Tr>
                                        <Th>{t("Name")}</Th>
                                        <Th>{t("Phone number")}</Th>
                                        <Th>{t("Market UZ")}</Th>
                                        <Th>{t("Market RU")}</Th>
                                        <Th>{t("Accepted")}</Th>
                                        <Th>{t("Block / unblock")}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        get(headData,'content',[])?.map((user,i) => (
                                            <Tr key={i+1} _hover={{bg: "#f3f3f3"}} cursor={"pointer"}>
                                                <Td>{get(user,'name','-')}</Td>
                                                <Td>{get(user,'phoneNumber','-')}</Td>
                                                <Td>{get(user,'market.nameUz','-')}</Td>
                                                <Td>{get(user,'market.nameRu','-')}</Td>
                                                <Td>
                                                    {
                                                        get(user,'accepted') ?
                                                        <Icon as={TbCheck}/> : <Icon as={TbX}/>
                                                    }
                                                </Td>
                                                <Td>
                                                    {
                                                        get(user,'blocked') ?
                                                            <Button
                                                                colorScheme={'green'}
                                                                leftIcon={<TbLockOpen />}
                                                                onClick={() => unBlockUser(get(user,'id',''))}
                                                            >{t("unblock")}</Button> :
                                                            <Button
                                                                colorScheme={'red'}
                                                                leftIcon={<TbLock />}
                                                                onClick={() => blockUser(get(user,'id',''))}
                                                            >{t("block")}</Button>
                                                    }
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    ) : <NoData />
                }
                <Pagination
                    setPage={setPage}
                    pageCount={get(headData, "totalPages", 1)}
                    page={page}
                />
            </Stack>
        </>
    )
}
export default UserList
