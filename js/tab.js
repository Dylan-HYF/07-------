var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.init();
    }
    //初始化绑定事件
    init() {
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
}
new Tab('#tab');
