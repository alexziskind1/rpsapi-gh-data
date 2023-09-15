import { GithubIssue } from './models';
import { loadJsonFromFileName } from '../util/json-utils';

const origDataFileName = 'datasets-issues-with-comments.json';

export function loadGHIssues(): GithubIssue[] {
    const data = loadJsonFromFileName<GithubIssue[]>(origDataFileName);
    //console.log(data);
    return data;
}