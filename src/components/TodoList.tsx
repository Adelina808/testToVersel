"use client";
import {
    useDeleteTodoMutation,
    useDeleteTodosMutation,
    useGetTodoQuery,
    usePostTodoMutation,
    useUpdateTodoMutation,
} from "@/redux/api/todo";
import { useUploadMutation } from "@/redux/api/upload";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormAdd {
    name: string;
    age: number;
    file: string[];
}

const TodoList = () => {
    const [uploadMutation] = useUploadMutation();
    const [postMutation] = usePostTodoMutation();
    const [updateMutation] = useUpdateTodoMutation();
    const [deleteMutation] = useDeleteTodoMutation();
    const [deleteAll] = useDeleteTodosMutation();
    const { data: getTodos = [] } = useGetTodoQuery();

    const { register: registerAdd, handleSubmit: handleSubmitAdd } =
        useForm<IFormAdd>();
    const { register: registerEdit, handleSubmit: handleSubmitEdit } =
        useForm<IFormAdd>();

    const [editId, setEditId] = useState<number | null>(null);
    const [todos, setTodos] = useState<ITodos[]>([]);
    const [isLoading, setIsLoading] = useState(false)


    const onSubmit: SubmitHandler<IFormAdd> = async (data) => {
        setIsLoading(true)
        const file = data.file[0];
        const formData = new FormData();
        formData.append("file", file);
        const { data: responseFile } = await uploadMutation(formData);
        const newData = {
            name: data.name,
            age: data.age,
            file: responseFile?.url,
        };

        const { data: responseData } = await postMutation(newData);
        setTodos(responseData!);
        setIsLoading(false)
    };

    const editHandler: SubmitHandler<IFormAdd> = async (data) => {
        const file = data.file[0];
        const formData = new FormData();
        formData.append("file", file);
        const { data: responseFile } = await uploadMutation(formData);

        const newData = {
            name: data.name,
            age: data.age,
            file: responseFile?.url,
        };

        const newUpdate = {
            _id: editId,
            data: newData,
        };

        const { data: responseData } = await updateMutation(newUpdate);
        setTodos(responseData!);
        setEditId(null);
    };

    const deleteHandler = async (id: number) => {
        const { data: responseData } = await deleteMutation(id);
        setTodos(responseData!);
    };

    const deleteAllHandler = async () => {
        await deleteAll();
    };

    const fetchTodo = () => {
        setTodos(getTodos);
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmitAdd(onSubmit)}>
                <input
                    type="text"
                    {...registerAdd("name", { required: true })}
                />
                <input
                    type="number"
                    {...registerAdd("age", { required: true })}
                />{" "}
                <input
                    type="file"
                    {...registerAdd("file", { required: true })}
                />
                {isLoading ? <>
                <button type="button">Loading...</button>
                </> : <button type="submit">Add</button>}
            </form>
            <button onClick={deleteAllHandler}>Delete All</button>
            {todos.map((el) => (
                <div className="">
                    {editId == el._id ? (
                        <>
                            <Image
                                alt="img"
                                src={el.file}
                                width={300}
                                height={300}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "25px",
                                }}
                            />
                            <form onSubmit={handleSubmitEdit(editHandler)}>
                                <input
                                    type="text"
                                    placeholder="name"
                                    {...registerEdit("name", {
                                        required: true,
                                    })}
                                />
                                <input
                                    type="number"
                                    placeholder="age"
                                    {...registerEdit("age", {
                                        required: true,
                                    })}
                                />
                                <input
                                    type="file"
                                    placeholder="file"
                                    {...registerEdit("file", {
                                        required: true,
                                    })}
                                />
                                <button type="submit">SAVE</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li>
                                    <Image
                                        alt="img"
                                        src={el.file}
                                        width={300}
                                        height={300}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "25px",
                                        }}
                                    />
                                    <span>Product : {el.name}</span>
                                    <span>Product's price : {el.age}</span>
                                    <button onClick={() => setEditId(el._id!)}>
                                        Edit
                                    </button>
                                    <br />
                                    <button
                                        onClick={() => deleteHandler(el._id!)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default TodoList;
