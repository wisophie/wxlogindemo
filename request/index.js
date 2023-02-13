// 请求封装
export default function http(path, data = {}) {
	// 设置请求头
	const header = {
		'content-type': 'application/x-www-form-urlencoded'
	}
	// 开始请求
	return uni.request({
		header,
		url: `http://7dgvmk.natappfree.cc${path}`,
		method: 'POST',
		data,
	}).then(data => {
		//data为一个数组，数组第一项为错误信息，第二项为返回数据
		const [error, res] = data;
		// 出错
		if (error) {
			uni.hideLoading()
			uni.showToast({
				title: '网络出错了',
				image: "/static/error.png"
			})
			return Promise.reject('网络出错了');
		}
	
		// statusCode判断
		if (res.statusCode == 200) {// 成功请求
			return Promise.resolve(res.data);
		} else if (res.statusCode == 401 || res.statusCode == 403) {
			// Authorization问题 鉴权问题
		}
	})
}
