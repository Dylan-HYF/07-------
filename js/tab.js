var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        //先获取加号
        this.add = this.main.querySelector('.tabadd');
        //再获取ul
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.init();
    }
    //初始化绑定事件
    init() {
        //这里的this指的是实例对象,给加号添加点击事件
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            //给每个li添加属性,添加索引号,把li当做对象
            this.lis[i].index = i;
            //给每个li绑上点击事件
            this.lis[i].onclick = this.toggleTab;
        }
    }
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
    addTab() {
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        //把新创建的li添加进ul
        that.ul.insertAdjacentHTML('beforeend', li);
    }
}
new Tab('#tab');
