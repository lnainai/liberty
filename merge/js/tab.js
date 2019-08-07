~function () {
    /*
     * tabChange封装一个选项卡插件，只要大结构保持统一，即可实现选项卡功能
     * 参数：container：当前要实现选项卡的这个容器
     * defaultIndex：默认选中项的索引
     */
    function tabChange(container, defaultIndex) {
        var tabFirst = utils.firstChild(container),  //ul
            oLis = utils.children(tabFirst),  //三个li
            divList = utils.children(container, "div"); //得到div的元素标签
        //让defaultIndex对应的页卡选中的样式
        defaultIndex = defaultIndex || 0;
        utils.addClass(oLis[defaultIndex], "select");
        utils.addClass(divList[defaultIndex], "select");
        //实现具体的切换功能
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onclick = function () {
                var curSiblings = utils.siblings(this);
                for (var i = 0; i < curSiblings.length; i++) {
                    utils.removeClass(curSiblings[i], "select");
                }
                utils.addClass(this, "select");
                var index = utils.index(this);
                for (var i = 0; i < divList.length; i++) {
                    i === index ? utils.addClass(divList[i], "select") : utils.removeClass(divList[i], "select");
                }
            }
        }
    }

    //在闭包里面，如果想让外部使用，可以暴露一个接口selectTab
    window.selectTab = tabChange;
}();
