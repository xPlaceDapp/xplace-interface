/* tslint:disable */
/* eslint-disable */
/**
 * MultiversX Microservice API
 * ## Welcome the the MultiversX Microservice API!  Here you can set your custom documentation in markdown format 
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { PixelInfosBo } from '../models';
import { PixelsBo } from '../models';
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pixelsControllerGetAllPixels: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/pixels`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} x 
         * @param {number} y 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pixelsControllerGetPixelInfos: async (x: number, y: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'x' is not null or undefined
            if (x === null || x === undefined) {
                throw new RequiredError('x','Required parameter x was null or undefined when calling pixelsControllerGetPixelInfos.');
            }
            // verify required parameter 'y' is not null or undefined
            if (y === null || y === undefined) {
                throw new RequiredError('y','Required parameter y was null or undefined when calling pixelsControllerGetPixelInfos.');
            }
            const localVarPath = `/pixels/{x}/{y}/infos`
                .replace(`{${"x"}}`, encodeURIComponent(String(x)))
                .replace(`{${"y"}}`, encodeURIComponent(String(y)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pixelsControllerGetAllPixels(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<PixelsBo>>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).pixelsControllerGetAllPixels(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} x 
         * @param {number} y 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pixelsControllerGetPixelInfos(x: number, y: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<PixelInfosBo>>> {
            const localVarAxiosArgs = await DefaultApiAxiosParamCreator(configuration).pixelsControllerGetPixelInfos(x, y, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pixelsControllerGetAllPixels(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<PixelsBo>>> {
            return DefaultApiFp(configuration).pixelsControllerGetAllPixels(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} x 
         * @param {number} y 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pixelsControllerGetPixelInfos(x: number, y: number, options?: AxiosRequestConfig): Promise<AxiosResponse<PixelInfosBo>> {
            return DefaultApiFp(configuration).pixelsControllerGetPixelInfos(x, y, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async pixelsControllerGetAllPixels(options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<PixelsBo>>> {
        return DefaultApiFp(this.configuration).pixelsControllerGetAllPixels(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public async pixelsControllerGetPixelInfos(x: number, y: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<PixelInfosBo>> {
        return DefaultApiFp(this.configuration).pixelsControllerGetPixelInfos(x, y, options).then((request) => request(this.axios, this.basePath));
    }
}
