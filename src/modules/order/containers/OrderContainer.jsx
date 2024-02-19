import {useParams} from "react-router-dom";
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import {OverlayLoader} from "../../../components/loader/index.js";
import {Box, Button, Flex, Heading, Link, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {get, isArray, isEmpty, isEqual, isNull} from "lodash";
import {FiClock, FiPhone, FiTag, FiUser} from "react-icons/fi";
import usePostQuery from "../../../hooks/api/usePostQuery.js";


const OrderContainer = () => {
    const { id } = useParams();
    const {t} = useTranslation();
    const {data,isLoading} = useGetOneQuery({
        url: URLS.get_order,
        key: KEYS.get_order,
        id
    })
    const {mutate} = usePostQuery({
    })

    const orderDelivered = () => {
        mutate({url: `${URLS.delivered_order}/${id}`},{
            onSuccess: () => {
            }
        });
    };
    const headData = get(data,'data.data');

    if (isLoading){
        return <OverlayLoader />
    }
    return(
        <>
        <Flex width={"100%"} backgroundColor={'#f6f6f6'} justifyContent={"center"} alignItems={"center"}>
            <Box p={4} minHeight={'100vh'} width={{base: '100%',md: '50%'}}>
                <Heading size={'md'} mb={5}>
                    {t("Буюртма")} #{get(headData,'number','')}
                </Heading>
                <Flex>
                    <FiUser style={{fontSize: 20}} />
                    <Text ml={1}>
                        {t("Name")}: {get(headData,'user.name','')}
                    </Text>
                </Flex>
                <Flex>
                    <FiPhone style={{fontSize: 20}} />
                    <Text ml={1}>
                        {t("Phone")}: {get(headData,'user.phoneNumber','')}
                    </Text>
                </Flex>
                <Flex>
                    <FiTag style={{fontSize: 20}} />
                    <Text ml={1}>
                        {t("Located market")}: {get(headData,'user.market','')}
                    </Text>
                </Flex>
                <Flex mt={4}>
                    <FiClock style={{fontSize: 20}} />
                    <Text ml={1}>
                        {t("Date")}: {get(headData,'orderedTime','')}
                    </Text>
                </Flex>
                {
                    (!isEmpty(get(headData,'products',[])) && isArray(get(headData,'products'))) && (
                      get(headData,'products',[]).map((item,i) => (
                          <Flex my={4}>
                              <Text>{i+1})</Text>
                              <Text fontWeight={600} mx={2}>{get(item,'productName','')}</Text>
                              <Text> x </Text>
                              <Text mx={1}>{get(item,'count')}</Text>
                              <Text>{t("dona")}</Text>
                          </Flex>
                      ))
                    )
                }
                <Flex>
                    <Text mr={1}>{t("Qoldirilgan izoh")}:</Text>
                    {
                        isNull(get(headData,'comment',null)) ?
                            <Text>{t('No comment')}</Text> :
                            <Text>{get(headData,'comment','')}</Text>
                    }
                </Flex>
                {
                    isEqual(get(headData,'status'),"DELIVERED") && (
                        <Text mt={3} textAlign={"center"} color={'red'}>
                            {t("Order delivered!")}
                        </Text>
                    )
                }
                <Box mt={4}>
                    <Link
                        isExternal
                        href={`https://yandex.com/navi/?whatshere%5Bzoom%5D=18&whatshere%5Bpoint%5D=${get(headData,'lan')}%2C${get(headData,'lat')}&lang=uz&from=navi`}
                    >
                        <Button width={'100%'} colorScheme={"yellow"}>{t('МАНЗИЛ ЛОКАЦИЯСИ')}</Button>
                    </Link>
                    {
                        !isEqual(get(headData,'status'),"DELIVERED") && (
                            <Button
                                width={'100%'}
                                colorScheme={"green"}
                                mt={2}
                                onClick={orderDelivered}
                            >
                                {t('ЕТКАЗИБ БЕРИЛДИ')}
                            </Button>
                        )
                    }
                </Box>
            </Box>
        </Flex>
        </>
    )
}
export default OrderContainer
