import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { Request } from 'express';

export default function logFetch (req: Request) {
    const request = req;

    return function doFetch (url: RequestInfo, init: RequestInit = { headers: {} }) {
        // @ts-ignore
        init.headers['x-orig-req'] = request.req_id;
        return fetch(url, { ...(init || {}), });
    }
}
