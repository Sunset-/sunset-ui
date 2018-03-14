/**
 * 公共图片浏览插件
 * author：fanll
 * version:1.0
 * 使用：
 * 页面中添加commonImageViewer.css
 * seajs.use(commonImageViewer.js)
 * 功能：
 * 1.对于页面上包含class="viewer-image"的图片提供功能浏览,data-viewer="800,600",指定尺寸
 * 2.主动调用CommonImageViewer.show(src,option)，主要用于地图中事件冒泡被阻止,option = {width:800,height:600};
 */
(function () {

	//添加css样式文件
	// var style = document.createElement('link');
	// style.setAttribute("rel", "stylesheet");
	// style.setAttribute("type", "text/css");
	// style.setAttribute("href", "/components/commonImageViewer/commonImageViewer.css");
	// document.getElementsByTagName("head")[0].appendChild(style);

	/*Jquery mousewheel插件*/
	(function (a) {
		function b(b) {
			var g = b || window.event,
				h = i.call(arguments, 1),
				j = 0,
				l = 0,
				m = 0,
				n = 0,
				o = 0,
				p = 0;
			if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
				if (1 === g.deltaMode) {
					var q = a.data(this, "mousewheel-line-height");
					j *= q, m *= q, l *= q
				} else if (2 === g.deltaMode) {
					var r = a.data(this, "mousewheel-page-height");
					j *= r, m *= r, l *= r
				}
				if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
					var s = this.getBoundingClientRect();
					o = b.clientX - s.left, p = b.clientY - s.top
				}
				return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
			}
		}

		function c() {
			f = null
		}

		function d(a, b) {
			return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
		}
		var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
			h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
			i = Array.prototype.slice;
		if (a.event.fixHooks)
			for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
		var k = a.event.special.mousewheel = {
			version: "3.1.12",
			setup: function () {
				if (this.addEventListener)
					for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
				else this.onmousewheel = b;
				a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
			},
			teardown: function () {
				if (this.removeEventListener)
					for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
				else this.onmousewheel = null;
				a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
			},
			getLineHeight: function (b) {
				var c = a(b),
					d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
				return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
			},
			getPageHeight: function (b) {
				return a(b).height()
			},
			settings: {
				adjustOldDeltas: !0,
				normalizeOffset: !0
			}
		};
		a.fn.extend({
			mousewheel: function (a) {
				return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
			},
			unmousewheel: function (a) {
				return this.unbind("mousewheel", a)
			}
		})
	})(jQuery);

	//公共图片浏览插件
	var CommonImageViewer;
	(function ($) {
		CommonImageViewer = window.CommonImageViewer || (window.CommonImageViewer = {
			$viewer: null,
			$img: null,
			$thumbnails: null,
			DEFAULT_WIDTH: 800,
			DEFAULT_HEIGHT: 600,
			DEFAULT_OPACITY: 0.7,
			width: 800,
			height: 600,
			state: {
				posX: 0,
				posY: 0,
				scale: 1,
				horizontal: 1,
				vertical: 1,
				rotate: 0
			},
			trace: {},
			group: null,
			init: function () {
				this.createDom();
				return this;
			},
			createDom: function () {
				var $viewer;
				if ($(".common-image-viewer").length) {
					return true;
				} else if (this.$viewer) {
					$("body").append(this.$viewer);
				} else {
					this._createDom();
				}
			},
			_createDom: function () {
				var html = [];
				html.push('<div class="common-image-viewer">');
				html.push('<ul class="common-viewer-thumbnails"></ul>');
				html.push('<div title="关闭" class="image-viewer-close">X</div>');
				html.push('<img class="image-viewer-img"  onerror="this.src=\'/assets/img/nopic.png\'"/>');
				html.push('<div class="image-viewer-browse">');
				html.push('<div class="image-viewer-browse-aperture"></div>');
				html.push('</div>');
				html.push('<div class="common-image-viewer-prev"><</div>');
				html.push('<div class="common-image-viewer-next">></div>');
				html.push('<div class="image-viewer-tools">');
				html.push('<div title="原始大小" data-tool="realsize" class="viewer-tool"><span class="image-viewer-tool-realsize"></span></div>');
				html.push('<div style="display:none;" title="退出全屏" data-tool="fullScreen" class="fullScreen-btn viewer-tool"><span class="image-viewer-tool-fullScreen"></span></div>');
				html.push('<div title="旋转" data-tool="rotate" class="viewer-tool"><span class="image-viewer-tool-rotate"></span></div>');
				html.push('<div title="水平翻转" data-tool="horizontalturn" class="viewer-tool"><span class="image-viewer-tool-horizontalturn"></span></div>');
				html.push('<div title="垂直翻转" data-tool="verticalturn" class="viewer-tool"><span class="image-viewer-tool-verticalturn"></span></div>');
				html.push('</div>');
				html.push('</div>');
				var $viewer = this.$viewer = $(html.join(''));
				this.$img = $(".image-viewer-img", $viewer);
				this.$thumbnails = $(".common-viewer-thumbnails", $viewer);
				this.bindEvent($viewer);
				$("body").append($viewer);
			},
			bindEvent: function ($viewer) {
				var self = this,
					$document = $(document);
				//浏览事件
				$document.on("click", ".viewer-image", function () {
					var $this = $(this);
					var optionStr = ($this.attr("data-viewer") || "").split(",");
					var option = {
						width: optionStr[0],
						height: optionStr[1],
						opacity: $this.attr("data-opacity")
					};
					self.group = $this.attr("group") || null;
					self.show(this.src, option);
				});
				this.$thumbnails.on("click", "img", function () {
					var $this = $(this);
					$this.parent().addClass("active").siblings().removeClass("active");
					self.restore();
					self.bindImage($this.attr("src"));
					return false;
				});
				//关闭
				$(".image-viewer-close", $viewer).bind("click touchstart", function (ev) {
					self.close();
					return false;
				});
				//平移事件
				function mousemoveListener(ev) {
					ev = self._getMouse(ev);
					touchX = ev.pageX;
					touchY = ev.pageY;
					self.translation("mousemove", ev);
					return false;
				}
				var clickTime = 0,
					clickX,
					clickY,
					touchX,
					touchY;
				$viewer.bind("mousedown touchstart", function (ev) {
					ev = self._getMouse(ev);
					clickTime = new Date().getTime();
					clickX = touchX = ev.pageX;
					clickY = touchY = ev.pageY;
					self.translation("mousedown", ev);
					$viewer.bind("mousemove touchmove", mousemoveListener);
					return false;
				});
				$document.bind("mouseup touchend", function (ev) {
					ev = self._getMouse(ev);
					if (new Date().getTime() - clickTime < 200 && (clickX == touchX && clickY == touchY)) {
						self.close();
						return;
					}
					$viewer.unbind("mousemove touchmove", mousemoveListener);
					self.translation("mouseup", ev);
					// return false;
				});
				//缩放
				this.$img.mousewheel(function (event, delta) {
					self.zoom(delta > 0, event.offsetX, event.offsetY);
					return false;
				});
				//工具事件
				$viewer.on("mouseup touchend", ".viewer-tool", function () {
					switch ($(this).data("tool")) {
						case "realsize":
							self.realSize();
							break;
						case "fullScreen":
							self.fullScreen();
							break;
						case "rotate":
							self.rotateRight();
							break;
						case "horizontalturn":
							self.horizontalTurn();
							break;
						case "verticalturn":
							self.verticalTurn();
							break;
					}
					$viewer.unbind("mousemove touchmove", mousemoveListener);
					return false;
				});
				//上一张/下一张
				$viewer.on('mouseup touchend', '.common-image-viewer-prev,.common-image-viewer-next', function () {
					var $imgs = $(self.group ? 'img.viewer-image[group="' + self.group + '"]' : 'img.viewer-image'),
						total = $imgs.length,
						currentSrc = self.$img[0].src,
						index;
					for (var i = 0, temp; temp = $imgs[i]; i++) {
						if (temp.src == currentSrc) {
							index = i;
							break;
						}
					}
					if ($(this).hasClass('common-image-viewer-prev')) {
						index--;
						if (index < 0) {
							index += total;
						}
					} else {
						index++;
						if (index >= total) {
							index -= total;
						}

					}
					self.show($imgs[index].src);
					$viewer.unbind("mousemove touchmove", mousemoveListener);
					return false;
				});
			},
			/**
			 * 显示图片
			 * @return {[type]} [description]
			 */
			show: function (src, option) {
				this.createDom();
				this._setOption(option || {});
				this.bindImage(src);
				//透明化已有的遮罩
				this.$hideShim = $(".common-dialog-bg").css({
					background: "rgba(0,0,0,0)"
				});
				this.$viewer.show();
				$('body').css({
					overflow: 'hidden'
				});
			},
			/**
			 * 关闭
			 * @return {[type]} [description]
			 */
			close: function () {
				//恢复其他遮罩
				this.$hideShim && this.$hideShim.css({
					background: ""
				});
				this.$viewer.hide();
				$('body').css({
					overflow: 'auto'
				});
			},
			/**
			 * 绑定图片
			 */
			bindImage: function (src) {
				var self = this,
					img = this.$img[0];
				if (src == img.src) {
					this._resetState();
				} else {
					img.onload = function () {
						self._resetState();
						img.onload = null;
					};
					img.src = src;
				}
			},
			_setOption: function (option) {
				this.width = option.width || this.DEFAULT_WIDTH;
				this.height = option.height || this.DEFAULT_HEIGHT;
				this.opacity = option.opacity || this.DEFAULT_OPACITY;
				this.$viewer.addClass("fullScreen").css({
					width: "100%",
					height: "100%",
					top: "0px",
					left: "0px",
					margin: "0px",
					background: "rgba(0,0,0," + this.opacity + ")"
				});
				$(".fullScreen-btn", this.$viewer).attr("title", "退出全屏");
				//抓取同组，渲染缩略图
				if (option.group) {
					var $thums = $("img[group='" + option.group + "']");
					if ($thums.length) {
						var html = [];
						for (var i = 0, l = $thums.length; i < l; i++) {
							html.push('<li><img src="' + $thums.attr("src") + '" /></li>');
						}
						//this.$thumbnails.html(html.join(''));
					} else {
						//this.$thumbnails.empty()
					}
				}
			},
			_getMouse: function (ev) {
				if (ev.originalEvent && ev.originalEvent.touches && ev.originalEvent.touches.length) {
					ev = ev.originalEvent.touches[0];
				}
				return ev;
			},
			/**
			 * 1.还原
			 */
			restore: function () {
				this._resetState();
			},
			/**
			 * 2.平移
			 */
			translation: function (eventType, ev) {
				ev = this._getMouse(ev);
				var state = this.state,
					trace = this.trace,
					mx = ev.pageX,
					my = ev.pageY;
				if (eventType == "mousemove") {
					var offsetX = mx - trace._startX;
					var offsetY = my - trace._startY;
					state.posX = offsetX + trace._startPosX;
					state.posY = offsetY + trace._startPosY;
					this._refreshTransform();
				} else if (eventType == "mousedown") {
					trace._startX = mx;
					trace._startY = my;
					trace._startPosX = state.posX;
					trace._startPosY = state.posY;
				}
			},
			/**
			 * 3.缩放
			 */
			zoom: function (bigger, offsetX, offsetY) {
				var state = this.state,
					img = this.$img[0],
					imgWidth = img.width,
					imgHeight = img.height;
				var next = bigger ? (this.state.scale * 1.2) : (this.state.scale / 1.2);
				if (next > 0 && next < 17) {
					//以鼠标中心点缩放
					offsetX /= state.scale;
					offsetY /= state.scale;
					state.posX = state.posX - (offsetX - (imgWidth / 2)) * (next - state.scale);
					state.posY = state.posY - (offsetY - (imgHeight / 2)) * (next - state.scale);
					state.scale = next;
					this._refreshTransform();
				}
			},
			/**
			 * 4.原始大小
			 */
			realSize: function () {
				this.state.scale = 1;
				this._refreshTransform();
			},
			/**
			 * 5.左旋转
			 */
			rotateLeft: function (eventType) {
				var state = this.state;
				state.rotate -= state.horizontal * state.vertical * 90;
				this._refreshTransform();
			},
			/**
			 * 6右旋转
			 */
			rotateRight: function (deg) {
				var state = this.state;
				state.rotate += state.horizontal * state.vertical * 90;
				this._refreshTransform();
			},
			/**
			 * 7水平翻转
			 */
			horizontalTurn: function (deg) {
				this.state.horizontal *= -1;
				this._refreshTransform();
			},
			/**
			 * 8垂直翻转
			 */
			verticalTurn: function (deg) {
				this.state.vertical *= -1;
				this._refreshTransform();
			},
			/**
			 * 全屏
			 * @return {[type]} [description]
			 */
			fullScreen: function () {
				var $viewer = this.$viewer,
					isFull = $viewer.toggleClass("fullScreen").hasClass("fullScreen"),
					$btn = $(".fullScreen-btn", $viewer);
				if (isFull) {
					$viewer.css({
						width: "100%",
						height: "100%",
						top: "0px",
						left: "0px",
						margin: "0px"
					});
					$btn.attr("title", "退出全屏");
				} else {
					$viewer.css({
						width: this.width,
						height: this.height,
						top: "50%",
						left: "50%",
						"margin": -this.height / 2,
						"margin-left": -this.width / 2
					});
					$btn.attr("title", "全屏");
				}
				this._moveCenter();
			},
			/**
			 * 刷新位置缩放样式
			 */
			_refreshTransform: function () {
				var state = this.state,
					stl = this.$img[0].style,
					buff = [];
				buff.push("translate(");
				buff.push(state.posX);
				buff.push("px,");
				buff.push(state.posY);
				buff.push("px) ");
				buff.push("scale(");
				buff.push(state.scale * state.horizontal);
				buff.push(",");
				buff.push(state.scale * state.vertical);
				buff.push(") rotate(");
				buff.push(state.rotate);
				buff.push("deg)");
				buff = buff.join("");
				// 兼容各浏览器
				stl.transform = buff;
				stl.oTransform = buff;
				stl.msTransform = buff;
				stl.mozTransform = buff;
				stl.webkitTransform = buff;
			},
			/**
			 * 重置状态信息
			 *
			 * @private
			 */
			_resetState: function (ii) {
				var img = this.$img[0],
					$viewer = this.$viewer,
					imgWidth = img.width,
					imgHeight = img.height;
				var state = this.state,
					sandBoxWidth = $viewer.width(),
					sandBoxHeight = $viewer.height();
				// 中央显示
				state.posX = (sandBoxWidth - imgWidth) / 2;
				state.posY = (sandBoxHeight - imgHeight) / 2;
				if ((imgWidth / sandBoxWidth) > (imgHeight / sandBoxHeight)) {
					state.scale = sandBoxWidth * 0.7 / imgWidth;
				} else {
					state.scale = sandBoxHeight * 0.7 / imgHeight;
				}
				state.horizontal = 1;
				state.vertical = 1;
				state.rotate = 0;
				this._refreshTransform();
			},
			/**
			 * 居中
			 * @return {[type]} [description]
			 */
			_moveCenter: function () {
				var state = this.state,
					img = this.$img[0],
					$viewer = this.$viewer,
					imgWidth = img.width,
					imgHeight = img.height,
					sandBoxWidth = $viewer.width(),
					sandBoxHeight = $viewer.height();
				state.posX = (sandBoxWidth - imgWidth) / 2;
				state.posY = (sandBoxHeight - imgHeight) / 2;
				this._refreshTransform();
			}
		}).init();
	})($);

})();