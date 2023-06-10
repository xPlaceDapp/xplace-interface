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
/**
 * 
 * @export
 * @interface PixelsBo
 */
export interface PixelsBo {
    /**
     * x coordinate of the pixel
     * @type {number}
     * @memberof PixelsBo
     */
    x: number;
    /**
     * y coordinate of the pixel
     * @type {number}
     * @memberof PixelsBo
     */
    y: number;
    /**
     * Address of the player that played the pixel
     * @type {string}
     * @memberof PixelsBo
     */
    address: string;
    /**
     * Pixel's color
     * @type {string}
     * @memberof PixelsBo
     */
    color: string;
    /**
     * How many times the pixel has been played
     * @type {number}
     * @memberof PixelsBo
     */
    playedCount: number;
}
