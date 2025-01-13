import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle } from '../api/articleApi';
import { useCustomMove } from '../hooks/useCustomMove';
import '../css/ArticleView.css';

const initialState = {
    no: 0,
    title: '',
    content: '',
    writer: '',
    regDate: ''
}


const BoardView = () => {
   
    const { no } = useParams();
    
    const [ article, setArticle ] = useState(initialState);

    const { moveToList, moveToModify } = useCustomMove();

    useEffect(() => {

        getArticle(no)
            .then(data => {
                console.log('data : ', data);                
                setArticle(data);
            }) 
            .catch(error => {
                console.log('error: ', error);
            });


    }, [no]); // 의존성 배열
    
    const onDelete = () => {


    }

    return (
        <>
        <div className="container">
            <div className="title">{article.no}번 게시글 정보</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>제목 : </span> {article.title}</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>내용 : </span> {article.content}</div>
            <div className="content">
                Created on {article.regDate} by {article.writer}
            </div>

            <div className="form-actions">
            <button onClick={() => moveToModify(no)}>Modify</button>                       
                <button className='btn-sm' variant='danger' onClick={onDelete}>Delete</button>
                <button onClick={ () => moveToList() }>List</button>
            </div>     
        </div>
        </>
    );
}


export default BoardView;