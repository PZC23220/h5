<template>
	<div class="main_page">
		<div class="income">
			<span class="detail_title">本视频收入</span>
			<span><img src="" alt="" class="icon"><i class="video_money">31,256</i></span>
		</div>
		<div class="income_details">
			<p class="detail_title">收入详情</p>
			<ul class="income_img">
				<li>
					<img class="gift" src="" alt="">
					<p><span class="left"><img src="" alt="" class="icon">20</span><span class="right">&times;100</span></p>
				</li>
				<li>
					<img class="gift" src="" alt="">
					<p><span class="left"><img src="" alt="" class="icon">30</span><span class="right">&times;300</span></p>
				</li>
				<li>
					<img class="gift" src="" alt="">
					<p><span class="left"><img src="" alt="" class="icon">50</span><span class="right">&times;300</span></p>
				</li>
			</ul>
		</div>
		<div class="fans_detail">
			<p class="detail_title">粉丝详情</p>
			<ul class="fans_list">
				<li>
					<img class="fans_img" src="" alt="">
					<p>結月 みおな</p>
					<span><img class="icon" src="" alt="">6,678</span>	
				</li>
				<li>
					<img class="fans_img" src="" alt="">
					<p>結月 みおな</p>
					<span><img class="icon" src="" alt="">6,678</span>	
				</li>
				<li>
					<img class="fans_img" src="" alt="">
					<p>結月 みおな</p>
					<span><img class="icon" src="" alt="">6,678</span>	
				</li>
			</ul>
		</div>
	</div>
</template>

<style rel="stylesheet/scss" lang="scss">
  .detail_title {
	color: #A5A5A5;
  }
  img.icon {
  		width: 12px;
  	}
  .income {
  	background: #f9f9f9;
  	height: 25px;
  	line-height:25px;
  	padding: 13px 12px;
  	overflow: hidden;
  	.detail_title {
  		margin-right: 20px;
  	}
	.video_money {
		font-size: 16px;
		color: #666;
		font-style: normal;
	}
  	
  }
  .income_details {
  	padding: 0 12px;
  	.detail_title {
  		margin-top: 10.5px;
  	}
  	ul {
  		padding-top: 7.5px;
  		padding-bottom: 30px;
  		display: flex
  	}
  	li {
  		flex: 1;
  		&:not(:first-child) {
  			margin-left: 6px;
  		}
  		>img {
  			background: #f9f9f9;
  			width: (69px/375px)*100vw;
  			max-width: 69px;
  			padding: 11.5px 8.5px;
  			border-radius: 5px;
  		}
  		@media screen and (max-width: 400px) {
	        >img {
	        	padding: 11.5px 5px;
	        }
	    }
  		p {
  			overflow: hidden;
  			max-width: 86px;
  			color: #888;
  			.right {
  				float: right;
  			}
  		} 
  	}
  }
  .fans_detail {
  	padding: 0 12px;
  	.fans_list {
  		padding-top: 7.5px;
  		padding-bottom: 30px;
  		li {
  			height: 30px;
  			line-height: 30px;
  			padding: 12px 0;
  			border-top: 1px solid #F0F0F0;
  			&:last-child {
  				border-bottom: 1px solid #F0F0F0;
  			}
			.fans_img {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				float: left;
			}
			p {
				float: left;
				padding-left: 11px;

			}
			span {
				float: right;
				color: #666;
			}
  		}
  	}
  }
</style>