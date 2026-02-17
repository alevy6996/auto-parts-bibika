export interface ListQuickGroupResponse {
    link: boolean;
    name: string;
    quickgroupid: number;
    synonyms: string;
    row?: ListQuickGroupResponse[];
}

export const defaultListQuickGroupResponse: ListQuickGroupResponse = {
    link: false,
    name: '', 
    quickgroupid: 0, 
    synonyms: ''
}