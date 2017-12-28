
describe("测试模态框能否正确的显示和隐藏", function () {

    var html = '<!-- modal示例 -->'+
        '<div class="modal modal-test animated">'+
        '    <div class="modal-mask"></div>'+
        '    <div class="modal-dialog">'+
        '        <div class="modal-foot">'+
        '            <br><br><br><br>'+
        '            <button class="btn-ok uk-button uk-button-primary">确认</button>'+
        '            <button class="btn-cancel uk-button">取消</button>'+
        '        </div>'+
        '    </div>'+
        '</div>';


    document.body.insertAdjacentHTML("beforeEnd", html);


    var modal = new Modal(".modal-test");

    it("显示模态框", function (done) {
        modal.show();


        setTimeout(function () {
            expect(modal.$self.css("display")).toBe("block");
            expect(modal.$self.hasClass("show")).toBe(true);
            done();
        }, 1000);

    });

    it("隐藏对话框", function (done) {
        modal.hide();

        expect(modal.$self.css("display")).toBe("block");
        expect(modal.$self.hasClass("show")).toBe(false);

        // 默认是0.3 ～ 0.5秒动画结束，然后再检测是否正确隐藏
        setTimeout(function(){
            expect(modal.$self.css("display")).toBe("none");
            done();
        }, 2000);
    });


});