var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);

        //先获取加号
        this.add = this.main.querySelector('.tabadd');
        //再获取ul
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    //初始化绑定事件
    init() {
        //在初始化事件里更新所有的li和section
        this.updateNode();
        //这里的this指的是实例对象,给加号添加点击事件
        this.add.onclick = this.addTab;

        for (var i = 0; i < this.lis.length; i++) {
            //给每个li添加属性,添加索引号,把li当做对象
            this.lis[i].index = i;
            //给每个li绑上点击事件
            this.lis[i].onclick = this.toggleTab;
            //给删除按钮绑定事件
            this.remove[i].onclick = this.removeTab;
            //dblclick = double click  双击事件
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //把获取元素抽出来,实现动态获取元素
    updateNode() {
        this.spans = this.main.querySelectorAll('.firstnav ul li span:first-child');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
    }
    //切换功能
    toggleTab() {
        //that指的就是实例对象里面的this
        that.clearClasses();
        //这里的this指向被点击的li
        this.className = 'liactive';
        //这里要用that,因为this指向的是所有的li,而不是实例对象
        that.sections[this.index].className = 'conactive';
    }
    clearClasses() {
        //因为是用了that,表示实例对象调用这个函数,所以里面可以直接写this
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //添加功能
    addTab() {
        //先把所有class都清掉
        that.clearClasses();
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>';
        //把新创建的li添加进ul
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        //在这里再执行更新过元素的初始化事件,注意这里要用that
        that.init();
    }
    //删除功能
    removeTab(e) {
        //阻止事件冒泡,不让li的点击切换事件执行
        e.stopPropagation();
        //获取这个按钮的父元素的索引号
        var index = this.parentNode.index;
        //根据我们上面获得的索引号删除元素
        that.lis[index].remove();
        that.sections[index].remove();
        //删除以后再用初始化函数更新一下现在的状态
        that.init();
        //如果页面中有被选中的li,就不执行下面的代码,函数碰到return就不再往下执行
        if (document.querySelector('.liactive')) return;
        //这个时候,index就指向被删除的元素的后一个元素
        that.lis[index] && that.lis[index].click();
        //让被删除的选项卡的前一个选项卡自动执行一下点击事件
        index--;
        //如果已经没有选项卡了,就不执行点击事件,短路运算
        that.lis[index] && that.lis[index].click();
    }
    editTab() {
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //把当前的内容添加给input的value
        this.innerHTML = `<input type="text" value="${this.innerHTML}"/>`;
        var input = this.children[0];
        //给input的value默认选中
        input.select();
        //把value返回给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        //键盘弹起事件,注意要写e和e.keyCode   13就是回车
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        };
    }
    // 编辑内容
    // editTab(e) {
    //     // 禁止双击选中
    //     window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

    //     // this ==> 双击的元素 span
    //     // that ==> 实例化对象

    //     // 替换当前操作的html内容为input框
    //     // 1、需要把原先的内容代入输入框
    //     var spanContent = this.innerHTML;
    //     this.innerHTML = `
    //   <input type="text" value="${spanContent}" />
    // `;

    //     // 2、输入框内容自动选中
    //     var inputElement = this.children[0]; // input元素
    //     inputElement.select();
    //     // 3、失去焦点时候,恢复原样
    //     inputElement.onblur = function () {
    //         // this ===> input框
    //         this.parentNode.innerHTML = this.value;
    //     };

    //     inputElement.onkeyup = function (e) {
    //         if (e.keyCode === 13) {
    //             this.blur();
    //         }
    //     };
    // }
}
new Tab('#tab');
