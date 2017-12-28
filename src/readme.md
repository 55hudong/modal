# 模态框组件
html结构参考bootstrap的modal组件，结合生产用运用到的功能，封装成了一个单独的组件。 内部只包含基础的css样式，实际应用中需要自行添加。


# 源码
[source](modal.ts)

# 引入方式

### 单独应用
将build/Modal.js引入到html文件即可。

### 模块形式

+ 内部采用umd形式打包，使用javascript开发可以直接通过加载器加载***build/Modal.js***。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>

<!-- modal示例 -->
<div class="modal modal-test animated">
    <div class="modal-mask"></div>
    <div class="modal-dialog">
        <div class="modal-foot">

            <br><br><br><br>

            <button class="btn-ok uk-button uk-button-primary">确认</button>
            <button class="btn-cancel uk-button">取消</button>
        </div>
    </div>
</div>
    
<script src="/build/Modal.js"></script>    
<script>
    let modal = new Modal(".modal-test");
    modal.ok(function(){
        console.log("点击了确认按钮");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000)
        });
    }).cancel(function(){
        console.log("点击了取消按钮");
    })

    modal.show();
</script>
</body>
</html>
```

+ 如果是typescript，请引入***src/Modal/index***
```typescript

import * as Modal from "src/Modal";
let modal = new Modal(".modal-test");
modal.ok(function(){
    console.log("点击了确认按钮");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000)
    });
}).cancel(function(){
    console.log("点击了取消按钮");
})

modal.show();

```

