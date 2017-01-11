export interface IDate {
    items:  Array<IDateItem>;
    prev:   boolean;
    next:   boolean;
    title?: string;
}

export interface IDateItem {
    id:     number;
    name:   any;
    enable: boolean;
    cur?:   boolean;
    start?: number;
    end?:   number;
}
