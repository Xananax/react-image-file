export default function isBlob(obj){
	return (obj && obj.content_type &&  obj.data)
}