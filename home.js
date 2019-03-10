layui.define(['element', 'layer'], function(exports) {

	var $ = layui.$,
		$body = $('body'),
		element = layui.element,
		layer = layui.layer;

	var screen_size = {
		pc: [991, -1],
		pad: [768, 990],
		mobile: [0, 767]
	}

	var getDevice = function() {
		var width = $(window).width();
		for(var i in screen_size) {
			var sizes = screen_size[i],
				min = sizes[0],
				max = sizes[1];
			if(max == -1) max = width;
			if(min <= width && max >= width) {
				return i;
			}
		}
		return null;
	}

	var isDevice = function(label) {
		return getDevice() == label;
	}

	var isMobile = function() {
		return isDevice('mobile');
	}

	var Tab = function(el) {
		this.el = el;
		this.urls = [];
	}

	Tab.prototype.content = function(src) {
		var iframe = document.createElement("iframe");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("src", src);
		iframe.setAttribute("data-id", this.urls.length);
		return iframe.outerHTML;
	};

	Tab.prototype.is = function(url) {
		return(this.urls.indexOf(url) !== -1)
	};

	Tab.prototype.add = function(title, url) {
		if(this.is(url)) return false;
		this.urls.push(url);
		element.tabAdd(this.el, {
			title: title,
			content: this.content(url),
			id: url
		});
		this.change(url);
	};

	Tab.prototype.change = function(url) {
		element.tabChange(this.el, url);
	};

	Tab.prototype.delete = function(url) {
		element.tabDelete(this.el, url);
	};

	Tab.prototype.onChange = function(callback) {
		element.on('tab(' + this.el + ')', callback);
	};

	Tab.prototype.onDelete = function(callback) {
		var self = this;
		element.on('tabDelete(' + this.el + ')', function(data) {
			var i = data.index;
			self.urls.splice(i, 1);
			callback && callback(data);
		});
	};

	var Home = function() {

		var tabs = new Tab('tabs'),
			navItems = [];

		$('#Nav a').on('click', function(event) {
			event.preventDefault();
			var $this = $(this),
				url = $this.attr('href'),
				title = $.trim($this.text());
			if(url && url !== 'javascript:;') {
				if(tabs.is(url)) {
					tabs.change(url);
				} else {
					navItems.push($this);
					tabs.add(title, url);
				}
			}
			$this.closest('li.layui-nav-item')
				.addClass('layui-nav-itemed')
				.siblings()
				.removeClass('layui-nav-itemed');
		});

		// 默认触发第一个子菜单的点击事件
		$('#Nav li.layui-nav-item:eq(0) > dl.layui-nav-child > dd > a:eq(0)').trigger('click');

		tabs.onChange(function(data) {
			var i = data.index,
				$this = navItems[i];
			if($this && typeof $this === 'object') {
				$('#Nav dd').removeClass('layui-this');
				$this.parent('dd').addClass('layui-this');
				$this.closest('li.layui-nav-item')
					.addClass('layui-nav-itemed')
					.siblings()
					.removeClass('layui-nav-itemed');
			}
		});

		tabs.onDelete(function(data) {
			var i = data.index;
			navItems.splice(i, 1);
		});

		this.slideSideBar();
	}

	Home.prototype.slideSideBar = function() {
			var $slideSidebar = $('.slide-sidebar'),
				$pageContainer = $('.layui-body'),
				$mobileMask = $('.mobile-mask');

			var isFold = false;
			$slideSidebar.click(function(e) {
				e.preventDefault();
				var $this = $(this),
					$icon = $this.find('i'),
					$admin = $body.find('.layui-layout-admin');
				var toggleClass = isMobile() ? 'fold-side-bar-xs' : 'fold-side-bar';
				if($icon.hasClass('ai-menufold')) {
					$icon.removeClass('ai-menufold').addClass('ai-menuunfold');
					$admin.addClass(toggleClass);
					isFold = true;
					if(isMobile()) $mobileMask.show();
				} else {
					$icon.removeClass('ai-menuunfold').addClass('ai-menufold');
					$admin.removeClass(toggleClass);
					isFold = false;
					if(isMobile()) $mobileMask.hide();
				}
			});

			var tipIndex;
			// 菜单收起后的模块信息小提示
			$('#Nav li > a').hover(function() {
				var $this = $(this);
				if(isFold) {
					tipIndex = layer.tips($this.find('em').text(), $this);
				}
			}, function() {
				if(isFold && tipIndex) {
					layer.close(tipIndex);
					tipIndex = null
				}
			})

			if(isMobile()) {
				$mobileMask.click(function() {
					$slideSidebar.trigger('click');
				});
			}
		}
		//获取登陆的管理员工账户
	var adminName;
	adminName = localStorage["adminName"];
	document.getElementById("adminName").innerHTML = adminName;
	layui.use('layer', function() { //独立版的layer无需执行这一句
		var $ = layui.jquery,
			layer = layui.layer; //独立版的layer无需执行这一句
		$('#change').click(function() {
			$.ajax({
				url: 'http://cxuniversity.top:8010/flea/admin/selectOneById',
				contentType: "application/json",
				data: JSON.stringify({
					'id': parseInt(localStorage["adminId"]),
					'adminStatus': parseInt(localStorage["adminStatus"])
				}), //请求的附加参数，用json对象
				method: 'POST',
				success: function(res) {
					localStorage.setItem('adminNumber', res.data.adminNumber);
					localStorage.setItem('adminIphone', res.data.adminIphone);
					document.getElementById("adminName1").value = adminName;
					document.getElementById("adminIphone").placeholder = localStorage["adminIphone"];
					document.getElementById("adminNumber").placeholder = localStorage["adminNumber"];

				},
				error: function() {
					post_adduser = false; //AJAX失败也需要将标志标记为可提交状态
					//						layer.close(loading);
					layer.msg("添加失败", {
						icon: 5
					});
				}
			});
		});
		//獲取當前系統時間
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + date.getHours() + seperator2 + date.getMinutes() +
			seperator2 + date.getSeconds();
		//触发事件
		var active = {
			setTop: function() {
				var that = this;
				var type = 1;
				var adminName = localStorage["adminName"];
				//多窗口模式，层叠置顶
				layer.open({
					type: 1,
					title: '管理员信息',
					id: 'layerDemo' + type,
					area: ['500px', '400px'], //宽高
					content: '<div style="text-align:center;padding-top:80px;">' +
						'<table style="margin:auto">' +
						'<tr>' +
						'<td class="td-left">管理员账号：</td>' +
						'<td class="td-left">' +
						'<input id="adminName1" type="text" readonly unselectable="on"></input>' +
						'</td>' +
						'</tr>' +
						'<tr>' +
						'<td class="td-left">管理员密码：</td>' +
						'<td class="td-left">' +
						'<input id="adminNumber" type="text" maxlength="12" minlength="6"></input>' +
						'</td>' +
						'</tr>' +
						'<tr>' +
						'<td class="td-left">联系方式：</td>' +
						'<td class="td-left">' +
						'<input id="adminIphone" type="text"></input>' +
						'</td>' +
						'</tr>' +
						'</table>' +
						'</div>',
					btn: ['确认修改', '取消修改'] //只是为了演示
						,
					yes: function(index, layero) {
						if(document.getElementById("adminNumber").value != '') {
							localStorage.setItem('adminNumber', document.getElementById("adminNumber").value);
						};
						if(document.getElementById("adminIphone").value != '') {
							var sMobile = document.getElementById("adminIphone").value;
							if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(sMobile))) {
								alert("不是完整的11位手机号或者正确的手机号前七位");
								return false;
							} else {
								$.ajax({
									type: "post",
									url: "http://cxuniversity.top:8010/flea/admin/selectRepeat", //处理的servlet的url
									contentType: "application/json",

									data: JSON.stringify({
										"adminIphone": sMobile
									}),
									async: false,
									dataType: "json",
									success: function(data) {
										if(!data.success) {
											alert("此手机号已绑定管理员");
											return false;
										} else {
											localStorage.setItem('adminIphone', document.getElementById("adminIphone").value);
											$.ajax({
												url: 'http://cxuniversity.top:8010/flea/admin/updateOneAdmin',
												contentType: "application/json",
												data: JSON.stringify({
													'id': localStorage["adminId"],
													'adminNumber': localStorage["adminNumber"],
													'adminIphone': localStorage["adminIphone"],
													'updateBy': localStorage["adminName"],
													'updateData': currentdate

												}), //请求的附加参数，用json对象
												method: 'POST',
												success: function(res) {
													layer.closeAll();
													layer.msg('修改成功');
												},
												error: function() {
													post_adduser = false; //AJAX失败也需要将标志标记为可提交状态
													//						layer.close(loading);
													layer.msg("添加失败", {
														icon: 5
													});
												}
											});
										}
									},
									error: function(error) {
										alert("电话号码检测失败");
										return false;
									}
								});

							}
						};
					},
					btn2: function() {
						layer.closeAll();
					},
					zIndex: layer.zIndex //重点1
						,
					success: function(layero) {
						layer.setTop(layero); //重点2
					}
				});
			},
			offset: function(othis) {}
		};

		$('#layerDemo .layui-btn').on('click', function() {
			var othis = $(this),

				method = othis.data('method');
			active[method] ? active[method].call(this, othis) : '';
		});

	});

	exports('home', new Home);
});