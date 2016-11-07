
export interface Doc {
    _id?: string;
    type?: string;
    _rev?: string;
    _deleted?:boolean;
}

export interface Note extends Doc{
    //_id?: string;
    //type?: string;
    title?: string;
    note?: string;
    date?: Date;
}

export interface Call extends Doc{
    name?: string;
    address?: string;
    note?: string;
    date?: Date;
}

//generic action that we can use
export interface Action {
    type: string;
    data: any;
}