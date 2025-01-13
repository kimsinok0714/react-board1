import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/v1`;



export const getArticle = async (no) => {

    console.log('no : ', no);

    const result = await axios.get(`${prefix}/articles/${no}`);

    return result.data;   // 리턴 타입은 Promise 객체
      
}



export const getArticleList = async(pageParam) => {

    const { page, size } = pageParam;

    const result = await axios.get(`${prefix}/articles`, { params: {page, size} });

    return result.data;

}


export const postArticle = async (article) => {

    //  자바스크립트 객체 -> JSON 문자열 변환이 필요한데 axio 기본 지원
    
    const result = await axios.post(`${prefix}/articles`, article)
    
    return result.data;


}



export const putArticle = async (article) => {

    const result = await axios.put(`${prefix}/articles${article.no}`, article);
    return result.data;

}


export const getSearchArticle = async (searchParam) => {

    const { keyfield, keyword, page, size } = searchParam;

    const result = await axios.get(`${prefix}/search`, {params: {keyfield, keyword, page, size}});

    return result.data;

}