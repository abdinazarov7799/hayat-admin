import {useTranslation} from "react-i18next";
import {Box, CloseButton, Flex, Icon, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {get} from "lodash";
import React from "react";


const LinkItems = [
    {
        name: "Category",
        url: "/category",
    },
    {
        name: "Products",
        url: "/products",
    },
    {
        name: "Markets",
        url: "/markets",
    },
    {
        name: "Users",
        url: "/users",
    },
    {
        name: "Translations",
        url: "/translations",
    },
];

const SidebarContent = ({onClose, ...rest}) => {
    const {t} = useTranslation();
    const NavItem = ({icon, children, ...rest}) => {
        return (
            <Link
                href="#"
                style={{textDecoration: "none"}}
                _focus={{boxShadow: "none"}}
            >
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    my={"2"}
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: "blue.200",
                        color: "white",
                    }}
                    {...rest}
                >
                    {children}
                </Flex>
            </Link>
        );
    };
    return (
        <>
            <Box
                transition="3s ease"
                bg={useColorModeValue("white", "gray.900")}
                borderRight="1px"
                borderRightColor={useColorModeValue("gray.200", "gray.700")}
                w={{base: "full", md: 60}}
                pos="fixed"
                h="full"
                {...rest}
            >
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                        <NavLink to={"/"}>
                            <Image className={"dashboard-logo"} src={logo} width={130} height={55} />
                        </NavLink>
                    </Text>
                    <CloseButton display={{base: "flex", md: "none"}} onClick={onClose}/>
                </Flex>
                {LinkItems.map((link,index) => {
                    return (
                        <NavLink to={get(link, "url")} key={index} onClick={onClose}>
                            <NavItem>
                                {t(get(link,"name",""))}
                            </NavItem>
                        </NavLink>
                    )
                })}
            </Box>
        </>
    );
};
export default SidebarContent;
