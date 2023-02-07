import axios, { AxiosError } from "axios";

interface HttpDefaults {
    uri: string,
    timeout: number
}

interface PostHttp {
    url: string,
    data: Record<string, any>
}

interface ResponseHttp<T> {
    success: boolean,
    message: T
}

export default class Http {
    private defaults(): HttpDefaults {
        const url = process.env.URL;
        if (url === undefined) {
            throw new Error('URL is not defined');
        }
        return {
            uri: process.env.URL!,
            timeout: 3000
        }
    }

    private response<T>(props: {success: boolean, message: T}): ResponseHttp<T> {
        const {success, message} = props;
        return {
            success,
            message
        }
    }

    async post<T>(props: PostHttp): Promise<ResponseHttp<T> | ResponseHttp<string>> {
        const {uri, timeout} = this.defaults();
        const {url, data} = props;
        const fullUrl = `${uri}/${url}`;
        try {
            const req = await axios.post(fullUrl, data, {timeout});
            return this.response<T>(req.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                return this.response<string>({success: false, message: e.response?.data ?? 'erro na requisição'})
            }
            return this.response<string>({success: false, message: "erro na requisição"});
        }
    }

    async get<T>(props: {url: string}): Promise<ResponseHttp<T> | ResponseHttp<string>> {
        const {uri, timeout} = this.defaults();
        const {url} = props;
        const fullUrl = `${uri}/${url}`;
        try {
            const req = await axios.get(fullUrl, {timeout});
            return this.response<T>(req.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                return this.response<string>({success: false, message: e.response?.data ?? 'erro na requisição'})
            }
            return this.response<string>({success: false, message: "erro na requisição"});
        }
    }
}