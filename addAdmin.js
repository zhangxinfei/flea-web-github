function checkPhone() {
	var phone = document.getElementById('phone').value;
	var checkName = document.getElementById("checkPhone");
	var html = '';
	jQuery.ajax({
		type: "post",
		url: "http://cxuniversity.top:8010/flea/admin/selectRepeat", //处理的servlet的url
		contentType: "application/json",

		data: JSON.stringify({
			"adminIphone": phone
		}),
		async: false,
		dataType: "json",
		success: function(data) {
			if(!data.success) {
				//							alert("succ");
				html += '<font color="red">电话号码已存在</font>';
				checkName.innerHTML = html;
			} else {
				//							alert("faled");
				html += '<font color="green">电话号码可以使用</font>';
				checkName.innerHTML = html;
			}

		},
		error: function(error) {
			alert("电话号码检测失败");
			return false;
			//							$("#adminName").trigger("focus");
			//						document.getElementById("adminName").focus();
		}
	});
}

function checkName() {
	var adminName = document.getElementById('adminName').value;
	var checkName = document.getElementById("checkName");
	if(adminName == '') {
		var html = '';
		html += '<font color="red">请输入用户名</font>';
		checkName.innerHTML = html;
	} else {
		var html = '';
		jQuery.ajax({
			type: "post",
			url: "http://cxuniversity.top:8010/flea/admin/selectRepeat", //处理的servlet的url
			contentType: "application/json",

			data: JSON.stringify({
				"adminName": adminName
			}),
			async: false,
			dataType: "json",
			success: function(data) {
				if(!data.success) {
					//								alert("succ");
					html += '<font color="red">用户名已存在</font>';
					checkName.innerHTML = html;
				} else {
					//								alert("faled");
					html += '<font color="green">暂无该用户名，可以使用</font>';
					checkName.innerHTML = html;
				}

			},
			error: function(error) {
				//							alert("error");
				return false;
				//							$("#adminName").trigger("focus");
				//						document.getElementById("adminName").focus();
			}
		});
	}

}

function checkPost() {
	var adminName = document.getElementById("adminName").value;
	var adminiphone = document.getElementById('phone').value;
	var adminNumber = document.getElementById("password").value;
	var obj = document.getElementsByName('roleName'); //选择所有name="'roleName'"的对象，返回数组 
	//取到对象数组后，我们来循环检测它是不是被选中 
	var id = [];
	//	for(var i = 0; i < obj.length; i++) {
	//		if(obj[i].checked) roleName += obj[i].value + ','; //如果选中，将value添加到变量roleName中 
	//	}
	for(var i = 0, len = obj.length; i < len; i++) {
		if(obj[i].checked) {
			var signAgainReq = new Object();
			signAgainReq.id = obj[i].value;
			id.push(signAgainReq);
		}

	}
	//那么现在来检测s的值就知道选中的复选框的值了
	number = 0;
	var ckbox = document.getElementsByName("roleName");
	for(i = 0; i < ckbox.length; i++) {
		if(ckbox[i].checked)
			number++;
		else
			number = number;
	}
	if(number <= 0) {
		alert("请选择管理员角色！");
		return false;
		//document.execCommand('Refresh');
	}

	if($("#password").val() != $("#password1").val()) {
		alert("两次输入的密码不一致");
		return false;
	}
	//验证用户名是否重复的ajax
	jQuery.ajax({
		type: "post",
		url: "http://cxuniversity.top:8010/flea/admin/selectRepeat", //处理的servlet的url
		contentType: "application/json",

		data: JSON.stringify({
			"adminName": adminName
		}),
		async: false,
		dataType: "json",
		success: function(data) {
			//验证电话号码的ajax
			jQuery.ajax({
				type: "post",
				url: "http://cxuniversity.top:8010/flea/admin/selectRepeat", //处理的servlet的url
				contentType: "application/json",

				data: JSON.stringify({
					"adminIphone": adminiphone
				}),
				async: false,
				dataType: "json",
				success: function(data) {
					//alert("succ");
					//提交表单的ajax
					var seperator1 = "-";
					var seperator2 = ":";
					var date = new Date();
					var month = date.getMonth() + 1;
					var strDate = date.getDate();
					var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
						" " + date.getHours() + seperator2 + date.getMinutes() +
						seperator2 + date.getSeconds();
					jQuery.ajax({
						type: "post",
						url: "http://cxuniversity.top:8010/flea/admin/insertAdmin", //处理的servlet的url
						contentType: "application/json",

						data: JSON.stringify({
							"permissionList": localStorage.getItem("permissionList"),
							"permissionName": "TJGLY",
							"createBy": localStorage.getItem('adminName'),
							"createData": currentdate,
							"adminName": adminName,
							"adminNumber": adminNumber,
							"adminIphone": adminiphone,
							"id": id
						}),
						async: false,
						dataType: "json",
						success: function(data) {
							//								alert("succ");
							alert("添加成功！");
							window.close();
						},
						error: function(error) {
							alert(JSON.stringify(data));
							alert("add error");
							return false;
							//							$("#adminName").trigger("focus");
							//						document.getElementById("adminName").focus();
						}
					});
				},
				error: function(error) {
					alert("phone error");
					return false;
					//							$("#adminName").trigger("focus");
					//						document.getElementById("adminName").focus();
				}
			});
		},
		error: function(error) {
			alert("name error");
			return false;
			//							$("#adminName").trigger("focus");
			//						document.getElementById("adminName").focus();
		}
	});
}
$(function() {
	var permissionList = localStorage.getItem("permissionList");
	var adminParamsList = localStorage.getItem("adminParamsList");
	var permissionName = "CKGLYJS";
	var chk = document.getElementById('chk'); //获取页面写好的标签 
	var html = ''; //定义html
	jQuery.ajax({
		type: "post",
		url: "http://cxuniversity.top:8010/flea/Role/selectAllRole", //处理的servlet的url
		contentType: "application/json",

		data: JSON.stringify({
			"permissionName": permissionName,
			"permissionList": permissionList,
			"adminParamsList": adminParamsList
		}),
		async: false,
		dataType: "json",
		success: function(data) {
			//alert(data.data[0].id);
			//alert(data.data[1].adminName);
			if(!data.success) {
				alert("您还不能创建管理员");
				window.close;
			} else {
				for(i = 0; i < data.data.length; i++) {

					html += '<input lay-skin="primary" type="checkbox" value="' + data.data[i].id + '" name="roleName" title="' + data.data[i].roleName + '">'

				}
				chk.innerHTML = html; //插入html到id=chk的div标签
//				alert(JSON.stringify(data));
			}

		},
		error: function(error) {
			alert("error");

		}
	});
})
layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;

	//日期
	laydate.render({
		elem: '#date'
	});
	laydate.render({
		elem: '#date1'
	});

	//创建一个编辑器
	var editIndex = layedit.build('LAY_demo_editor');

	//自定义验证规则
	form.verify({
		adminname: function(value) {
			if(value.length > 12) {
				return '用户名不能超过12个字符';
			}
		},
		pass: [/(.+){6,12}$/, '密码必须6到12位'],
		content: function(value) {
			layedit.sync(editIndex);
		}
	});
	//监听提交
	form.on('submit(demo1)', function(data) {
		layer.alert(JSON.stringify(data.field), {
			title: '最终的提交信息'
		})
		return false;
	});
});