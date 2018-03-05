/**********************************************************
 * Constants used to track status changes in images 
 **********************************************************/
export const EMPTY = 'EMPTY'
export const LOADING = 'LOADING'
export const DONE = 'DONE'
export const ERROR = 'ERROR'
export type ImageLoaderLoadStatus  = 'EMPTY'|'DONE'|'ERROR'|'LOADING'