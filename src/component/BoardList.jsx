import { useEffect, useState, useRef } from "react";
import { useCustomMove } from '../hooks/useCustomMove';
import { getArticleList, getSearchArticle } from '../api/articleApi';
import PageComponent from './common/PageComponent';
import '../css/Article.css';

const initialState = {
    dtoList: [],
    pageNumList : [],
    pageRequestDto: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
}


const BoardList = () => {

    // const noRef = useRef(1);

    const [serverData, setServerData] = useState({...initialState});

    const [keyfield, setKeyfield] = useState('writer');

    const [keyword, setKeyword] = useState('');

    const { page, size, refresh, moveToList, moveToView } = useCustomMove();

 
   

    // 화면이 렌더링 될때 
    useEffect(() => {

        // 검색 기능 추가하지 않는 경우
        // getArticleList({page, size})
        //     .then(data => {
        //         console.log('data : ', data)
        //         setServerData(data);
        //     })
        //     .catch(error => {                
        //         console.log('error : ', error);                
        //     });

        
        // 겸색 기능 추가한 경우

        getSearchArticle({keyfield, keyword, page, size})
            .then(data => {
                console.log("data : " + data);
                setServerData(data);
            })
            .catch(error => {
                console.log("error : ", error);
            })
       
    }, [page, size, refresh]);
    

    const handleChanageKeyfield = (e) => {     
        
        setKeyfield(e.target.value);

    }


    const handleChanageKeyword = (e) => {

        setKeyword(e.target.value);

    }

    const handleClickSearch = () => {
        
        getSearchArticle({keyfield, keyword, page, size})
            .then(data => {
                console.log("data : " + data);
                setServerData(data);
            })
            .catch(error => {
                console.log("error : ", error);
            })

    }


    return (
        <>       
            <div className="board-container">        
                <h1 className="board-title">게시글 목록</h1>

                {/* Search Form */}
                <div style={{ marginBottom: "20px" }}>
                    <select value={keyfield} onChange={handleChanageKeyfield}>
                        <option value="writer">작성자</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                    </select>&nbsp;&nbsp;
                    <input type="text" placeholder="검색어 입력" value={keyword} onChange={handleChanageKeyword}/>&nbsp;&nbsp;
                    <button onClick={handleClickSearch}>검색</button>
                </div>

                <table className="board-table"> 
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            serverData.dtoList.map((article) => {                            
                                // article['no'] = noRef.current++;                            
                                return <tr key={article.no} onClick={() => moveToView(article.no)} style={{cursor: 'pointer'}}>
                                    <td>{article.no}</td>
                                    <td>{article.title}</td>
                                    <td>{article.writer}</td>
                                    <td>{article.regDate}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            <PageComponent serverData={ serverData }  movePage={moveToList}></PageComponent>
        
        </>
    )
}


export default BoardList;
