layui.define(['element'], function(exports) {

	var $ = layui.$;
	$('.input-field').on('change', function() {
		var $this = $(this),
			value = $.trim($this.val()),
			$parent = $this.parent();

		if(value !== '' && !$parent.hasClass('field-focus')) {
			$parent.addClass('field-focus');
		} else {
			$parent.removeClass('field-focus');
		}
	})
	exports('login');
});

layui.use(['layer', 'jquery'], function() {
	var layer = layui.layer,
		$ = layui.jquery

	$('.login').click(function() {
		var adminName = $('#adminName').val();
		var adminNumber = $('#adminNumber').val();
		if(adminName.length < 1) {
			layer.tips('请输入用户名', '#adminName');
			return;
		}
		if(adminNumber.length < 1) {
			layer.tips('请输入密码', '#adminNumber');
			return;
		}
		var a = {
			adminName: adminName,
			adminNumber: adminNumber
		}
		var string = JSON.stringify(a);
		//加密
		var encrypt = new JSEncrypt();
		//公钥
		var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCxiQSqD0q1pAUSGqrCLcMzsKRwPBkiFW3WWZ97srAp3oRoupqL1nevJJRVPIZUF3JhTyV47pnjsCqWo4w0NqGVXhkSQnIk4nj7S/w3I0gWUxqFzdP+xcPhA+mJxYq1HSMJ2qVQ6bQVT7/SgPSKWn++OEQWEFz5/uM/5STcJJlvQIDAQAB';
		encrypt.setPublicKey(PUBLIC_KEY);
		var encrypted = encrypt.encrypt(string);
		var url = 'http://cxuniversity.top:8010/flea/admin/selectByLogin';
		$.post(url, {
			'admin_login': encrypted
		}, function(res) {
			if(!res.success) {
				$('#code_img').click();
				layer.msg("登录失败");
			} else {
				//存入用户名
				localStorage.setItem('adminName', res.data.admin.adminName);
				//管理员id
				localStorage.setItem('adminId', res.data.admin.adminId);
				//管理员的角色ID在集合中
				localStorage.setItem("adminParamsList",res.data.admin.adminParamsList);
				//token
				localStorage.setItem('token', res.data.token);
				//管理员状态
				localStorage.setItem('adminStatus', res.data.admin.adminStatus);
				//管理员权限
				localStorage.setItem("permissionList",res.data.admin.permissionList);
				//管理員角色等級
				localStorage.setItem("roleLevel",res.data.admin.roleLevel);
				layer.msg("登录成功");
				location.href = 'index.html'
			}
		})
	})
});

function BindEnter() { 
 if (event.keyCode == 13) { 
     event.cancelBubble = true; 
     event.returnValue = false; 
         document.getElementById('login').click(); 
   } 
} 