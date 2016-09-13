export default function isString(obj:any):obj is string{
	return obj && (typeof obj === 'string');
}