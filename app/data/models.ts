export interface GithubIssue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
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
        site_admin: boolean;
    };
    labels: any[]; // You can replace 'any' with the specific type once you know the structure of labels.
    state: string;
    locked: boolean;
    assignee: null | any; // Replace 'any' with the specific type once you know the structure of assignee.
    assignees: any[]; // Replace 'any' with the specific type once you know the structure of assignees.
    milestone: null | any; // Replace 'any' with the specific type once you know the structure of milestone.
    comments: string[];
    created_at: number;
    updated_at: number;
    closed_at: number;
    author_association: string;
    active_lock_reason: null | any; // Replace 'any' with the specific type if you have the structure.
    pull_request: null | any; // Replace 'any' with the specific type once you know the structure of pull_request.
    body: string;
    timeline_url: string;
    performed_via_github_app: null | any; // Replace 'any' with the specific type if you have the structure.
    is_pull_request: boolean;
}
