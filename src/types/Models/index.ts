
    export interface Reactions {
        thumbsUp: number;
        wow: number;
        heart: number;
        rocket: number;
        coffee: number;
    }

    export interface Post {
        createdAt: Date;
        title: string;
        photo: string;
        userId: number;
        body: string;
        reactions: Reactions;
        id: string;
        date: Date;
    }

