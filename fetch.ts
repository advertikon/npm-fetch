import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { Request } from 'express';

interface FetchRequest extends Request {
    req_id: string;
}

export default function logFetch (req: FetchRequest) {
    const request = req;

    return function doFetch (url: RequestInfo, init: RequestInit = { headers: {} }) {
        if (init.headers) {
            // @ts-ignore
            init.headers['x-req-id'] = request.req_id;
        }

        return fetch(url, { ...(init || {}), });
    }
}
