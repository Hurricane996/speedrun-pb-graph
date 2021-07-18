export interface SRCResult<T> {
    data: T;
}

export interface SRCPaginatedResult<T> extends SRCResult<T> {
    data: T;
    pagination: {
        links: {rel: "prev" | "next"; uri: string}[];
    };
}

export interface SRCNameSet {
    international: string;
}

export interface SRCUser {
    id: string;
    names: SRCNameSet;
}

export interface SRCCategory {
    id: string;
    name: string;
    type: "per-game" | "per-level";
}

export interface EmbedGame {
    game: SRCResult<SRCGame>;
}
export interface EmbedLevel {
    level: SRCResult<SRCLevel>;
}
export interface EmbedCategory {
    category: SRCResult<SRCCategory>;
}

export interface SRCGame {
    id: string;
    names: SRCNameSet;
}

export interface SRCLevel {
    id: string;
    name: string;
}

export interface SRCVariableSet {
    [key: string]: string;
}

export interface SRCVariable {
    values : {
        values: {
            [key: string] : {
                label: string;
            };
        };
    };
}

export interface SRCRun {
    values: SRCVariableSet;
    date: string;
    times: {
        primary_t: number;
    };
    id: string;
    status: {
        status: string;
    };
}

export interface SRCPB {
    run: SRCRun;
}
