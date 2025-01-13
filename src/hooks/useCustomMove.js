import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"




const getNum = (param, defaultValue) => {

    if (!param) {
        return defaultValue;
    } 

    return parseInt(param);

}



// 컴포넌트(페이지) 이동 : 재사용
// export const useCustomMove = () => {

//     const navigate = useNavigate();

//     const [queryParams] = useSearchParams();

//     const page = getNum(queryParams.get('page'), 1);
//     const size = getNum(queryParams.get('size'), 10);

//     // page=1&size=10
//     const queryDefault = createSearchParams({page, size}).toString();

//     const moveToList = () => {
        
//         navigate({pathname: '../list', search: queryDefault});
//     }

//     return { moveToList };

// }


export const useCustomMove = () => {

    const navigate = useNavigate();
    
    const [refresh, setRefresh] = useState(false); 

    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    // page=1&size=10
    const queryDefault = createSearchParams({page, size}).toString();


    const moveToList = (pageParam) => {

        console.log('pageParam : ', pageParam); // {page: 1}

        let queryStr = '';

        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);    

            queryStr = createSearchParams({page: pageNum, size: sizeNum}).toString();

        }  else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);

        navigate({pathname: '../list', search: queryStr});

    }


    const moveToModify = (no) => {

        setRefresh(!refresh);

        navigate({pathname: `../modify/${no}`, search: queryDefault});

    }

    const moveToView = (no) => {

        navigate({pathname: `../view/${no}`, search: queryDefault});

    }


    

    return { moveToList, moveToModify, moveToView, page, size, refresh };



}