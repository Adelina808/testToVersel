namespace UPLOAD {
    type PostUploadRes = {
        name: string;
        format: string;
        url: string;
    };
    type PostUploadReq = FormData;
}
