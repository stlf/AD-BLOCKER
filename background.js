/*
	Author: Hassan
	Email : hassan.chiang@gmail.com
*/
function clear_search_result_ad(){
	if (window.location.href.indexOf('baidu.com')>0) {
		$("#content_left>div").each(function (){
			var $this = $(this);
			if($this.text().indexOf("商业推广") >= 0){
				$this.remove();
				console.log("删除了节点：" + $this.text());
			}
		});
	} else if(window.location.href.indexOf('www.so.com')>0)	{
		var a = $("#m-spread-left");
		if(a.length >0){
			a.remove();
		}
	}
}

var data = [];//保持api获取到的需要清除的广告选择器列表

function clear_float_ad(){
	for (var i = 0; i < data.length ; i++) {
		var selector = data[i];
		var tmp = $(selector);
		if(tmp.length){
			console.log("选择器(" + selector + ")--->清除了"+tmp.length+"个广告");
			$(selector).remove();
		}
	};
}

$(document).ready(function () {
	$.getJSON("https://raw.githubusercontent.com/HassanChiang/AD-BLOCKER/master/api/selector.json",function (result){
		data = result.data;
		console.log("从API获取到选择器列表：")
		console.log(data);
		clear_search_result_ad();
		clear_float_ad();
		$(document).bind('DOMSubtreeModified', function () {
			clear_search_result_ad();
			clear_float_ad();
		});
	});
});
