<template>
    <div class="main">
        <div class="header">
            <div class="detail">
                <a href="#" class="back">
                    <img src="../../../static/images/icon_arrow_back_black.png" alt="">
                </a>
                <span>详情</span>
            </div>
        </div>
        <div class="content">
         	<div class="main_page">
				<ul class="comment_list dynamic">
					<li>
						<div class="userinfo">
							<img src="" alt="">
							<span>結月 みおな</span>
							<i>18:10&nbsp;&nbsp;05.12</i>				
						</div>
						<div class="comment_content">
							<p>#オフショットや日常写真# No.127</p>
							<img src="" alt="">
						</div>
						<div class="comment_desc">
							<span><img src="" alt="">274,223</span>
						</div>
					</li>
				</ul>
				<div class="detail_comment_list">
					<h5>评论(<span>34</span>)</h5>
					<ul class="comment_list">
						<li>
							<div class="comment_info">
								<img src="" alt="">
								<span>結月 みおな</span>
								<i>05.12&nbsp;&nbsp;12:00</i>
							</div>
							<div class="comment_content">ありがとうございます！超嬉しかった！きっといい点数取れまーす(≧∇≦)/</div>
						</li>
						<li>
							<div class="comment_info">
								<img src="" alt="">
								<span>結月 みおな</span>
								<i>05.12&nbsp;&nbsp;12:00</i>
							</div>
							<div class="comment_content">ありがとうございます！超嬉しかった！きっといい点数取れまーす(≧∇≦)/</div>
						</li>
						<li>
							<div class="comment_info">
								<img src="" alt="">
								<span>結月 みおな</span>
								<i>05.12&nbsp;&nbsp;12:00</i>
							</div>
							<div class="comment_content">ありがとうございます！超嬉しかった！きっといい点数取れまーす(≧∇≦)/</div>
						</li>
					</ul>
				</div>
			</div>
        </div>
        <div class="footer">
        	<img src="" alt="">
        	<div class="edit">
        		<p><span class="edit_name">游客001</span><span>守护者</span><span><img src="" class="icon" alt=""><i>31,257</i></span></p>
        		<p><a href="">评论</a></p>
        	</div>
        	<div class="share">
        		<img src="" alt="">
        		<img src="" alt="">
        	</div>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.comment_list .comment_desc span:last-child {
    float: left;
}
.detail_comment_list {
	h5 {
		padding: 6px 12px 0;
		color: #BBBBBB;
	}
}
.content {
	top: 54px;
	height: calc(100vh - 54px - 50px);
	overflow: auto;
}
.footer {
	position: absolute;
	left: 0;
	top: calc(100vh - 50px);
	background: #E7E7E7;
	padding: 2px 12px;
	box-sizing: border-box;
	width: 100%;
	height: 50px;
	line-height: 50px;
	overflow: hidden;
	>img {
		display: block;
		float: left;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		margin-right: 6.5px;
		margin-top: 7.5px;
	}
	.edit {
		float: left;
		margin-right: 16px;
		width: calc(100% - 24px - 24.5px - 35px - 25px - 17.6px - 16px);
		font-size: 10px;
		-webkit-transform:scale(0.8);
		>p:first-child {
			margin-bottom: 3px;
			line-height: 14px;
			span:first-child {
				color: #4A4A4A;
				margin-right: 10.5px;
			}
			span:nth-child(2) {
				background: #666666;
				color: #fff;
				box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
				border-radius: 20px;
				display: inline-block;
				font-size: 8px;
				-webkit-transform:scale(0.8);
				width: 50px;
				height: 16px;
				line-height: 16px;
				text-align: center;
				margin-right: 9px;
			}
			span:last-child {
				img {
					width: 12px;
				}
				color: #666;
			}
		}
		a {
			display: block;
			width: 230px;
			height: 25px;
			line-height: 25px;
			background: #D8D8D8;
			border: 1px solid #979797;
			border-radius: 4px;
			padding: 0 6px;
			font-size: 12px;
			color: #7f7f7f;
		}
	}
	.share {
		float: right;
		overflow: hidden;
		img:first-child {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			float: left;
			margin-right: 18px;
			margin-top: 10.5px;
		}
		img:last-child {
			width: 17.6px;
			float: left;
		}
	}
}
</style>