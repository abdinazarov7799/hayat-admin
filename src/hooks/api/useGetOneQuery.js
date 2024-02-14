import React from 'react';
import {useQuery} from 'react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const fetchRequest = (url, params) => request.get(url, params);

const useGetOneQuery = (
    {
        id = null,
        key = "get-one",
        url = "test",
        enabled = true,
        params = {},
        showSuccessMsg = false,
        showErrorMsg = true
    }
) => {
    const {t} = useTranslation();
    const {isLoading, isError, data, error, refetch} = useQuery([key, id], () => fetchRequest(`${url}/${id}`, params), {
        onSuccess: () => {
        },
        onError: (data) => {
            if (showErrorMsg) {
                toast.error(t(data?.response?.data?.message || `ERROR!!! api not working`))
            }
        },
        enabled,
    });

    return {
        isLoading,
        isError,
        data,
        error,
        refetch,
    }
};

export default useGetOneQuery;
