import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
import { Request } from 'express';
import { FetchError } from '@bogochunas/error-handler';

interface FetchRequest extends Request {
    req_id: string;
}

export function logFetch (req: FetchRequest) {
    const request = req;

    return function doFetch (url: RequestInfo, init: RequestInit = { headers: {} }) {
        if (init.headers) {
            // @ts-ignore
            init.headers['x-req-id'] = request.req_id;
        }

        return fetch(url, { ...(init || {}), }).then(processResponse);
    }
}

function processResponse (resp: Response) {
    if (!resp.ok) {
        throw FetchError(resp);
    }

    return resp.json();
}
