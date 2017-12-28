import "../src/index.scss";
import * as $ from "jquery/dist/jquery.slim";
export default class Modal {
    /**
     *
     * @param selector {string} 模态框选择器
     * @param enableCloseByMask 是否要启用点击遮罩关闭
     */
    constructor(selector, enableCloseByMask) {
        /**
         * 是否启用点击遮罩关闭
         */
        this.enableCloseByMask = true;
        /**
         * 是否开启了过渡动画
         * 通过检测self是否包含animated类来控制
         */
        this.enableAnimated = false;
        this.selector = selector;
        if (typeof enableCloseByMask === "boolean") {
            this.enableCloseByMask = enableCloseByMask;
        }
        this.init();
    }
    init() {
        let self = this.$self = $(this.selector), $dialog = this.$dialog = self.find(".modal-dialog"), $modalMask = this.$mask = self.find(".modal-mask")
        // 确认按钮
        , $btnOk = this.$self.find(".btn-ok")
        // 关闭或者取消按钮
        , $btnCancel = this.$self.find(".btn-cancel");
        if (self.hasClass("animated")) {
            this.enableAnimated = true;
        }
        // 在遮罩上绑定关闭事件
        $modalMask && this.enableCloseByMask && $modalMask.on("click", () => {
            // 目前直接模拟点击取消按钮。 如果以后需要区分事件类型再说。
            $btnCancel.click();
        });
        $btnOk.on("click", () => {
            // 处理绑定的回调事件
            if (this.okCallback) {
                /**
                 * 回调的返回值。
                 * 如果需要阻止hide事件继续，需要通过同步返回boolean或者异步通过Promise返回一个boolean。
                 * 无论是同步还是异步，只有明确返回了false的值才会打断事件的进行。
                 */
                let returnValue;
                returnValue = this.okCallback.call(this);
                if (returnValue instanceof Promise) {
                    returnValue.then(() => {
                        this.hide();
                    });
                }
                else if (returnValue !== false) {
                    this.hide();
                }
            }
            else {
                this.hide();
            }
            return this;
        });
        $btnCancel.on("click", () => {
            // 处理绑定的回调事件
            if (this.cancelCallback) {
                /**
                 * 回调的返回值。
                 * 如果需要阻止hide事件继续，需要通过同步返回boolean或者异步通过Promise返回一个boolean。
                 * 无论是同步还是异步，只有明确返回了false的值才会打断事件的进行。
                 */
                let returnValue;
                returnValue = this.cancelCallback.call(this);
                if (returnValue instanceof Promise) {
                    returnValue.then((status) => {
                        if (status !== false) {
                            this.hide();
                        }
                    });
                }
                else if (returnValue !== false) {
                    this.hide();
                }
                else {
                }
            }
            else {
                this.hide();
            }
        });
    }
    /**
     * 显示模态框
     * @returns {this}
     */
    show() {
        document.body.classList.add("modal-open");
        this.$self.show();
        this.$self.css("pointer-events", "none");
        if (this.enableAnimated) {
            setTimeout(() => {
                this.$self.addClass("show");
            }, 100);
            this.$dialog.one("transitionend", () => {
                this.$self.css("pointer-events", "");
            });
        }
        else {
            this.$self.css("pointer-events", "");
        }
        return this;
    }
    /**
     * 隐藏模态框
     * @returns {this}
     */
    hide() {
        this.$self.removeClass("show");
        document.body.classList.remove("modal-open");
        if (this.enableAnimated) {
            this.$dialog.one("transitionend", () => {
                this.$self.hide();
            });
        }
        else {
            // 不存在过渡动画，直接关闭
            this.$self.hide();
        }
        return this;
    }
    /**
     * 绑定确认按钮的回调
     * @param {Function} callback
     * @returns {this}
     */
    ok(callback) {
        this.okCallback = callback;
        return this;
    }
    /**
     * 绑定取消按钮的回调
     * @param {Function} callback
     * @returns {this}
     */
    cancel(callback) {
        this.cancelCallback = callback;
        return this;
    }
    /**
     * 将对话框显示事件绑定到按钮上
     * @param btn
     */
    addTriggerButton(btn) {
        let $button = $(btn);
        $button.on("click", () => {
            this.show();
        });
        return this;
    }
}
