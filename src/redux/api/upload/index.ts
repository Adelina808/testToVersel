import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (build) => ({
        upload: build.mutation<UPLOAD.PostUploadRes,UPLOAD.PostUploadReq>({
            query: (data) => ({
                url: "/upload/file",
                method: "POST",
                body:data
            }),
            invalidatesTags: ["upload"],
        }),
    }),
});

export const{useUploadMutation}=api
