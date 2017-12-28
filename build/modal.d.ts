/// <reference types="jquery" />
import "../src/index.scss";
export default class Modal {
    /**add
     * 选择器。目前只允许类名或者ID
     */
    protected selector: string;
    /**
     * 模态框最顶层的jquery对象
     */
    $self: JQuery;
    /**
     * 模态框主窗体
     */
    $dialog: JQuery;
    /**
     * 模态框的遮罩
     */
    protected $mask: JQuery;
    /**
     * 是否启用点击遮罩关闭
     */
    private enableCloseByMask;
    /**
     * 是否开启了过渡动画
     * 通过检测self是否包含animated类来控制
     */
    private enableAnimated;
    /**
     *
     * @param selector {string} 模态框选择器
     * @param enableCloseByMask 是否要启用点击遮罩关闭
     */
    constructor(selector: any, enableCloseByMask: any);
    protected init(): void;
    /**
     * 显示模态框
     * @returns {this}
     */
    show(): this;
    /**
     * 隐藏模态框
     * @returns {this}
     */
    hide(): this;
    private okCallback;
    /**
     * 绑定确认按钮的回调
     * @param {Function} callback
     * @returns {this}
     */
    ok(callback: Function): this;
    private cancelCallback;
    /**
     * 绑定取消按钮的回调
     * @param {Function} callback
     * @returns {this}
     */
    cancel(callback: Function): this;
    /**
     * 将对话框显示事件绑定到按钮上
     * @param btn
     */
    addTriggerButton(btn: string | HTMLElement): this;
}
