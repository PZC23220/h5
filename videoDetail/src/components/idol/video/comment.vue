<template>
	<div class="main_page">
		<ul class="comment_list">
			<li v-for="(comment,key) in commentList">
				<div class="comment_info">
					<img :src="comment.avatar" alt="">
					<span>{{comment.nickname}}</span>
					<i>{{formatTime(comment.createTime)}}</i>
				</div>
				<div class="comment_content" v-html="TransferString(comment.content)"></div>
			</li>
		</ul>
	</div>
</template>

<script>
	import http from '@/utils/http.js';
	import Format from '@/utils/common.js';
	export default {
	  data() {
	  	return {
	  		commentList: {}
	  	}
	  },
	  methods: {
	    formatTime(key) {
	      let timer = new Date(key*1000);
	      return timer.Format('MM.dd hh:mm')
	    },
	    TransferString(content) {
	       let string = content;    
		    try{    
		        string=string.replace(/\r\n/g,"<br>")    
		        string=string.replace(/\n/g,"<br>");    
		    }catch(e) {    
		        console.log(e.message);    
		    }
		    return string;    
	    }
	  },
	  created: function() {
	  	var self = this;
	  	http.get('/post/list',{
	  		params: {
	  			targetType: 1,
	  			targetId: 2
	  		}
	  	}).then(function(res) {
	  		if(res.status === 200) {
	  			self.commentList = res.data;
	  			console.log(self.commentList);

	  		}
	  	})
	  }
	}
</script>