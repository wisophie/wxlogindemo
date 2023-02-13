<template>
	<view class="content">
		<image class="logo" :src="headerUrl"></image>
		<view class="text-area">
			<text class="title">{{nickName}}</text>
		</view>
		<view class="text-area button-style" @click="login()">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: 'Hello',//昵称
				headerUrl:'../../static/logo.png',//头像
			}
		},
		onLoad() {

		},
		methods: {
			
			login(){
				var that = this
				uni.showModal({
					mask: true,
					title: '温馨提示',
					content: '授权微信登录后才能正常使用小程序功能',
					success(res) {
						if (res.confirm) {
							uni.getUserProfile({
								desc: '获取你的昵称、头像',
								success: userRes => {
									if (userRes.errMsg == 'getUserProfile:ok' && userRes.userInfo != undefined) {
										var userInfo = {
											avatarUrl: userRes.userInfo.avatarUrl,
											nickName: userRes.userInfo.nickName,
											country: userRes.userInfo.country,
											province: userRes.userInfo.province,
											city: userRes.userInfo.city,
											language: userRes.userInfo.language,
											gender: userRes.userInfo.gender,
										}
										//对页面中的变量进行赋值
										that.nickName = userRes.userInfo.nickName
										that.headerUrl = userRes.userInfo.avatarUrl
										// 调用接口请求openid
										that.getUserOpenId(userRes.userInfo)
									} else {
										uni.showToast({
											icon:"none",
											title:"获取失败，请重试"
										})
									}
								},
								fail: error => {}
							});
						} else if (res.cancel) {}
					}
				});
			},
			
			
			getUserOpenId(userInfo){
				var that = this
				uni.login({
					provider: 'weixin',
					success(loginAuth) {
						var data = {'code':loginAuth.code,'userInfo':userInfo}
						var path = '/wx/auth/login_by_weixin'
						that.$http(path,data).then((response)=>{
							//userInfo['token'] = response.data.token
							console.log(response)
						})
					}
				})
			}
			
			

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.button-style{
		width: 150rpx;
		height: 60rpx;
		background-color: #007AFF;
		border-radius: 10rpx;
		margin-top: 60rpx;
	}
</style>
