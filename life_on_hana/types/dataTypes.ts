export type TArticlesLiked = {articleId: number,
    title: string,
    category: string,
    thumbnailS3Key?: string,
    publishedAt?: string,
    is_liked?: true,
}