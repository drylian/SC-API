interface Author {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
    url: string;
    html_url: string;
    remark: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
}


interface Asset {
    browser_download_url: string;
    name: string;
}

export interface GiteeRelease {
    id: number;
    tag_name: string;
    target_commitish: string;
    prerelease: boolean;
    name: string;
    body: string;
    author: Author;
    created_at: string;
    assets:Asset[];
}

/**
 * Release of app
 */
export interface ReleaseTypes {
    ident: string,
    name: string,
    link: string,
    cors:boolean
} 