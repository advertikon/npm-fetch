import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
import { ulid } from 'ulid';
import { Request } from 'express';
import { FetchError } from '@bogochunas/error-handler';

interface FetchRequest extends Request {
    req_id: string;
}

export function logFetch (req?: FetchRequest) {
    return function doFetch (url: RequestInfo, init: RequestInit = { headers: {} }) {
        // @ts-ignore
        init.headers['x-req-id'] = req?.req_id || ulid();

        return fetch(url, init).then(processResponse);
    }
}

function processResponse (resp: Response) {
    if (!resp.ok) {
        throw FetchError(resp);
    }

    return resp.json();
}
