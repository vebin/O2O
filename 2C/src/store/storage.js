const session = window.sessionStorage;
export default {
	set (key,data){
		return session.setItem(key,typeof data != 'string' ? JSON.stringify(data) : data);		
	},
	get (key){
		let data = session.getItem(key);
		if(!data){
			return false
		}
		return data;
	},
	remove (key){
		return session.removeItem(key)
	}
}