import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {
    deletePlaceHolderObjectThunk,
    getPlaceHolderObjectThunk, initialState,
    postPlaceHolderObjectThunk,
    updateEditTitleThunk
} from "./reducers/jsonPlaceHolderReducer";
import {Header} from "./components/Header"
import {Button} from "./components/Button";
import {EditableSpan} from "./EditableSpan";
import {Box, LinearProgress, TablePagination} from "@material-ui/core";
import {getPlaceHolderObjectType} from "./api/apiPlaceHolder";


function App() {
    const dispatch = useAppDispatch()
    const posts = useAppSelector(state => state.jphReducer)

    const[progress,setProgress]=useState<boolean>(false)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const [resultArray, setResultArray] = useState<Array<getPlaceHolderObjectType>>([])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatorFoo = () => {
        let newArr:Array<getPlaceHolderObjectType>=[]
        for (let i = page * rowsPerPage; i < (page * rowsPerPage) + rowsPerPage; i++) {
            newArr.push(posts[i])
        }
        setResultArray(newArr)
    }
    useEffect(()=>{
        dispatch(getPlaceHolderObjectThunk(setProgress))
    },[])

    useEffect(()=>{
        posts.length>0 && paginatorFoo()
    },[posts, page, rowsPerPage])//было page, rowsPerPage!!!!!!!!!!

    const addAllShit = (newTitle: string, newBody:string) => {
        dispatch(postPlaceHolderObjectThunk({title: newTitle, body: newBody},setProgress))
    }

    const deleteBtn = (value:number) => {
        dispatch(deletePlaceHolderObjectThunk(value, setProgress))
    }

    const editTitle = (titleId:number, newTitle:string)=>{

        return (
            dispatch(updateEditTitleThunk(titleId, newTitle, setProgress))
        )

    }
    const editTitleHandler = (titleId:number, newTitle:string) =>{
        editTitle(titleId, newTitle)
    }

    return (
        <div>
            <Header
                addAllShit={addAllShit}
            />
            <Box sx={{ width: '100%' }}>
                {progress && <LinearProgress/>}
            </Box>



            {resultArray.map((el,index, array) => {
                debugger
                return (
                    <div>
                        <Button callback={()=>deleteBtn(el.id)} btnName={"X"}/>
                        <span>{el.id} - </span>
                        <EditableSpan editTitle={editTitleHandler} id={el.id} title={el.title}/>
                        <Button callback={()=>editTitle(el.id, el.title)} btnName={"Update"}/>
                        <span><div style={{"color":"lightblue"}}> This is body: </div>{el.body}</span>
                    </div>
                )
            })}
            <TablePagination
                component="div"
                count={posts.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default App;
