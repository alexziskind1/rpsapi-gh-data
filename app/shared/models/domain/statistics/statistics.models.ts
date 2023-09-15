import { PtItem } from "../pt-item.model";

export interface ItemsForMonth {
    closed: PtItem[];
    open: PtItem[];
}

export interface FilteredIssues {
    categories: Date[];
    items: ItemsForMonth[];
}
