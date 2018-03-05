export const isString = 
  ( obj: any): obj is string =>
  ( obj && ( typeof obj === 'string' ) )

export default isString