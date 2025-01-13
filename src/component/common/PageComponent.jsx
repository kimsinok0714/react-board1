import '../../css/Article.css';



const PageComponent = ({ serverData, movePage }) => {

    console.log(serverData.pageNumList);

    // serverData.prev, pageNumList, next ...

    return(
        <>
            <div className="pagination">
                { 
                    serverData.prev ? <span onClick={() => movePage({page: serverData.prevPage})} className="prev">Prev</span> : <></>                    
                }

                {
                    serverData.pageNumList.map( pageNum => 
                        <span key={pageNum} onClick={() => movePage({page: pageNum})} 
                            style={{
                                color: pageNum === serverData.currentPage ? 'blue' : 'white',
                                cursor: 'pointer',
                                margin: '0 5px'
                            }}> {pageNum}
                        </span> )
                }

                {
                    serverData.next ? <span onClick={() => movePage({page: serverData.nextPage})} className="next">Next</span> : <></>                    
                }               

            </div> 
        </>
    );

}


export default PageComponent;