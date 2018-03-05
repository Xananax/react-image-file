/**
 * Constants used to track status changes in images 
 */
/**
 * represents the initial loading status 
 */
export const EMPTY = 'EMPTY'
/** 
 * represents the status while loading
 */
export const LOADING = 'LOADING'
/** 
 * represents the finished status if everything went well
 */
export const DONE = 'DONE'
/** 
 * represents the finished status when an error has occured 
 */
export const ERROR = 'ERROR'
/** 
 * A type that summarizes all loading status
 */
export type ImageLoaderLoadStatus  = 'EMPTY'|'DONE'|'ERROR'|'LOADING'