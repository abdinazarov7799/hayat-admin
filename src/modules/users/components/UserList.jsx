import {
    Heading,
    IconButton,
    Stack,
    Table, TableContainer, Tbody, Td,
    Th, Thead, Tr,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {get, isArray, isEmpty} from "lodash";
import Swal from "sweetalert2";
import {FiX} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery";
import dayjs from "dayjs";
import Pagination from "../../../components/pagination/index.jsx";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import NoData from "../../../components/NoData/index.jsx";


const UserList = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const {data,isLoading,refetch} = usePaginateQuery({
        key: KEYS.user_get_all,
        url: URLS.user_get_all,
        params: {
            params: {
                size,
            }
        },
        page
    });

    const {mutate} = useDeleteQuery({
        listKeyId: KEYS.user_get_all,
    })

    const deleteUser = (id) => {
        Swal.fire({
            title: t("Foydalanuvchini o'chirishga ishonchingiz komilmi?"),
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
                mutate({url: `${URLS.user_get_all}/${id}`},{
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
            <Stack>
                {
                    (!isEmpty(get(headData,'content',[])) &&
                        isArray(get(headData,'content',[]))) ?
                    (
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>{t("Login")}</Th>
                                        <Th>{t("Filial")}</Th>
                                        <Th>{t("Ism")}</Th>
                                        <Th>{t("Familiya")}</Th>
                                        <Th>{t("Telefon")}</Th>
                                        <Th>{t("Yaratilgan sana")}</Th>
                                        <Th>{t("Yangilangan sana")}</Th>
                                        <Th>{t("O'chirish")}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        get(headData,'content',[])?.map((user,i) => (
                                            <Tr key={i+1} _hover={{bg: "rgba(172,222,233,0.49)"}} cursor={"pointer"}>
                                                <Td>{get(user,'login','-')}</Td>
                                                <Td>{get(user,'Branch.name','-')}</Td>
                                                <Td>{get(user,'firstname','-')}</Td>
                                                <Td>{get(user,'lastname','-')}</Td>
                                                <Td>{get(user,'phone','-')}</Td>
                                                <Td>
                                                    {dayjs(get(user,'createdAt','-')).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                    )}
                                                </Td>
                                                <Td>
                                                    {dayjs(get(user,'updatedAt','-')).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                    )}
                                                </Td>
                                                <Td><IconButton icon={<FiX />} onClick={() => deleteUser(get(user,'id',''))} /></Td>
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
