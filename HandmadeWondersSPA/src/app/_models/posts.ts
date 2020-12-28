export interface postModel {
    postId: number,
    postTitle: string,
    postText: string,
    postThumbinalPhotoUrl: string,
    category: string
}

export interface postModelDTO {
    postId: number,
    postTitle: string,
    postText: string,
    postThumbinalPhotoUrl: string,
    category: string
}

export interface postArticle {
    postTitle: string,
    postText: string,
    postThumbinalPhotoUrl: string,
    category: string
}

export interface postPicture {
    postThumbinalPhotoUrl: string;
}
