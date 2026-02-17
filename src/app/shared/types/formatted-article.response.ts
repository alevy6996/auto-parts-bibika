import { SearchArticle } from '@store/query/search/responses/articles.response';
import { ArticleInfoImage, ArticleInfoProperties } from '@store/query/articles/responses/article-info.response';
import { ItemModel } from '@shared/models/item.model';

export type FormattedArticle = ItemModel & {
    fastest: SearchArticle;
    cheapest: SearchArticle;
    articles: SearchArticle[];
    images: ArticleInfoImage[];
    properties?: ArticleInfoProperties;
    description: string;
} & Partial<Record<keyof SearchArticle, string>>;

export interface FormattedArticleResponse {
    item: FormattedArticle[];
    crosses: FormattedArticle[];
}