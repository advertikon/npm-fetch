import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { ulid } from 'ulid';
import { Request } from 'express';

interface FetchRequest extends Request {
    req_id: string;
}

export function logFetch (req?: FetchRequest) {
    return function doFetch (url: RequestInfo, init: RequestInit = {}) {
        init.headers = { ...(init.headers || {}), 'x-req-id': req?.req_id || ulid() };

        return fetch(url, init);
    }
}
