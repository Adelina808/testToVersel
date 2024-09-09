namespace TODO{
    type GetTodoRes=ITodo[]
    type GetTodoReq=void

    type PostTodoRes=ITodo[]
    type PostTodoReq=ITodo
    

    type PatchTodoRes=ITodo[]
    type PatchTodoReq={
        _id:number|null,
        data:ITodo
    }
    
    type DeleteTodoRes=ITodo[]
    type DeleteTodoReq=number|null

    type DeleteTodosRes=[]
    type DeleteTodosReq=void

}