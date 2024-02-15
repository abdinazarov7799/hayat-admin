import {useTranslation} from "react-i18next";
import {useSettingsStore} from "../../../store";
import {get} from "lodash";
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton, MenuDivider, MenuItem, MenuList,
    Text,
    useColorModeValue, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {FiChevronDown, FiMenu} from "react-icons/fi";
import {NavLink} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import React from "react";
import userImg from '../../../assets/images/user.png';
import {AiOutlineLogout} from "react-icons/ai";
import UploadFile from "./UploadFile.jsx";

const MobileNav = ({
                       onOpen,
                       logout = () => {
                       },
                       ...rest
                   }) => {
    const {t, i18n} = useTranslation();
    const {isOpen,onOpen:onOpenFileUpload,onClose} = useDisclosure()
    const languages = [
        {id: 1, key: "Uz", label: "O'zbekcha"},
        {id: 2, key: "Ru", label: "Русский"},
    ];
    const setLang = useSettingsStore((state) => get(state, "setLang", () => {
    }));
    const lang = useSettingsStore((state) => get(state, "lang"));
    const changeLang = (code) => {
        setLang(code);
        return i18n.changeLanguage(code);
    };
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{base: "space-between", md: "flex-end"}}
            {...rest}
        >
            <IconButton
                display={{base: "flex", md: "none"}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <NavLink to={"/"} >
                <Image
                    className={"dashboard-logo"}
                    width={150}
                    display={{base: "flex", md: "none"}}
                    src={logo}
                />
            </NavLink>

            <HStack spacing={{base: "2", md: "6"}}>
                <Button onClick={onOpenFileUpload}>
                    {t("Upload file")}
                </Button>
                <UploadFile onClose={onClose} isOpen={isOpen}/>
                <Menu>
                    <MenuButton
                        as={Button}
                        transition="all 0.3s"
                        _focus={{boxShadow: "none"}}
                    >
                        <HStack>
                            <VStack
                                display={{base: "flex"}}
                                alignItems="flex-start"
                            >
                                <Text fontSize="md" fontWeight={600}>{lang}</Text>
                            </VStack>
                            <Box>
                                <FiChevronDown/>
                            </Box>
                        </HStack>
                    </MenuButton>
                    <MenuList
                        bg={useColorModeValue("white", "gray.900")}
                        borderColor={useColorModeValue("gray.200", "gray.700")}
                        p={0}
                    >
                        {languages?.map((language, index) => (
                            get(language, "key") !== lang && (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        changeLang(get(language, "key"));
                                    }}
                                >
                                    <Flex alignItems={"center"}>
                                        <Text ml={2}>{t(get(language, "label"))}</Text>
                                    </Flex>
                                </MenuItem>
                            )
                        ))}
                    </MenuList>
                </Menu>
                <Button onClick={logout} rightIcon={<AiOutlineLogout />}>
                    {t("Chiqish")}
                </Button>
            </HStack>
        </Flex>
    );
};
export default MobileNav;
