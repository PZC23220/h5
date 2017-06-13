<template>
	<div class="main_page">
		<ul class="comment_list">
			<h4>我的排行</h4>
			<li>
				<div class="comment_info">
					<b>4</b>
					<img class="idol_img" src="" alt="">
					<span><i>結月 みおな</i><br><img src="" class="icon" alt=""><em>31,257</em></span>
					<i><img src="" class="icon" alt=""><em>守护者</em></i>
				</div>
			</li>
			<h4>总排行</h4>
			<li>
				<div class="comment_info">
					<b style="color: #F3B714;">1</b>
					<img class="idol_img" src="" alt="">
					<span><i>結月 みおな</i><br><img src="" class="icon" alt=""><em>31,257</em></span>
					<i><img src="" class="icon" alt=""><em>守护者</em></i>
				</div>
			</li>
			<li>
				<div class="comment_info">
					<b style="color: #666;">2</b>
					<img class="idol_img" src="" alt="">
					<span><i>結月 みおな</i><br><img src="" class="icon" alt=""><em>31,257</em></span>
					<i><img src="" class="icon" alt=""><em>守护者</em></i>
				</div>
			</li>
			<li>
				<div class="comment_info">
					<b style="color: #EE8E52;">3</b>
					<img class="idol_img" src="" alt="">
					<span><i>結月 みおな</i><br><img src="" class="icon" alt=""><em>31,257</em></span>
					<i><img src="" class="icon" alt=""><em>守护者</em></i>
				</div>
			</li>
			<li>
				<div class="comment_info">
					<b>4</b>
					<img class="idol_img" src="" alt="">
					<span><i>結月 みおな</i><br><img src="" class="icon" alt=""><em>31,257</em></span>
					<i><img src="" class="icon" alt=""><em>守护者</em></i>
				</div>
			</li>
			<li>
				<div class="comment_info">
					<b>5</b>
					<img class="idol_img" src="" alt="">
					<span><i>結月 みおな</i><br><img src="" class="icon" alt=""><em>31,257</em></span>
					<i><img src="" class="icon" alt=""><em>守护者</em></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
 .comment_list {
 	padding: 0;
 	h4 {
 		background: #878787;
 		color: #fff;
 		padding: 0 12px;
 	}
 	li {
 		.comment_info {
 			height: 44px;
 			line-height: 22px;
 			>i {
	 			display: block;
	 			float: left;
	 			position: relative;
	 			em {
	 				background: #666666;
					box-shadow: 0 1px 2px 0 rgba(0,0,0,0.25);
					border-radius: 20px;
					color: #fff;
					display: inline-block;
					width: 50px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					font-size: 8px;
					margin-left: 5px;
					-webkit-transform : scale(0.67)
	 			}
	 			img {
	 				position: absolute;
	 				left: 0;
	 				top: 0;
	 			}
	 		}
 		}
 		padding: 11px 12px;
 		b {
 			float: left;
 			line-height: 44px;
 			font-size: 24px;
 			font-style: italic;
 			margin-right: 11px;
 		}
 		.idol_img {
 			width: 40px;
 			height: 40px;
 		}
 		span {
 			overflow: hidden;
 			float: left;
 			margin-right: 15px;
 			i {
 				font-size: 14px;
 				float: none;
 				color: #333;
 			}
 		} 		
 		.icon {
 			width: 18px;
 			height: 18px;
 		}
 	}
 }
</style>