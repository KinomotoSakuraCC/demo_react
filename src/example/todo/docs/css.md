## CSS

### 盒子模型

```css
.box-model {
    /* 外边距: top right bottom left */
    margin: 10px 20px 0 0;

    /* 边框: width style color */
    border: 1px solid black;  /* 黑色实线边框 */

    /* 内边距: top right bottom left */
    padding: 0 5px;

    /* 宽度及高度（内部） */
    width: 200px;
    height: 100px;

    /* 整个元素实际占据空间 */
    /* 宽度 = width + paddingLR + borderLR + (marginLR) */

    /* 外边距折叠（垂直） */
    /* A块出现在B块之上，A的下外边距与B的上外边距发生合并（取二者较大） */
    /* A块包含B块，且A无border、padding分隔，A与B的上外边距发生合并 */
}
```



### 定位方式

```css
.static-element {
    /* 静态定位，元素遵循正常的文档流（top等属性无效） */
    position: static;
}


.relative-element {
    /* 相对定位，元素相对于其正常文档流static的位置进行偏移，但仍在文档流中占据原来的空间 */
    /* 其他元素感知不到其偏移后的位置 */
    position: relative;
    top: 10px;  /* 向下偏移10px */
    left: 20px;  /* 向右偏移20px */

}


.father {
    position: relative;
}
.son.absolute-element {
    /* 绝对定位，元素脱离文档流，相对于最近的非static定位祖先元素进行定位（或浏览器视窗） */
    position: absolute;
    top: 50px;  /* 向下偏移10px */
    left: 50px;  /* 向右偏移20px */
}


.fixed-element {
    /* 固定定位，元素完全脱离文档流，始终相对于浏览器视窗进行定位，即使页面滚动位置也不改变 */
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;  /* z-index值越大，元素越靠上，可以是负数 */
    margin: auto;  /* 视窗中心 */
}
```

![image-20250512002328333](C:\Users\Sakur\AppData\Roaming\Typora\typora-user-images\image-20250512002328333.png)

![image-20250512002806710](C:\Users\Sakur\AppData\Roaming\Typora\typora-user-images\image-20250512002806710.png)

### 文本

#### example

```css
.p.custom-text {
    color: black;
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
    white-space: nowrap;  /* 超出不换行 */
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 鼠标悬浮 :hover */
.p.custom-text:hover {
    color: blue;
    text-decoration: underline;
    /* 设置光标形状 */
    cursor: pointer;  /* 手形光标 */
}
```



#### 字体及文本属性

```css
.p.text {
    width: 200px;
    height: 100px;

    /* font: font-style font-weight font-size font-family */
    /* 字体斜体 */
    font-style: italic;  /* normal */
    font-synthesis: style;  /* todo 需要设置 */

    /* 字体粗体 */
    font-weight: bold;  /* normal */

    /* 字体大小 */
    font-size: 16px;
    margin: 0;  /* todo p标签可能有默认外边距 */

    /* 行高 */
    line-height: 1.5;

    /* 水平对齐方式 */
    text-align: left;  /* left right center */

    /* vertical-align */

    /* 文本修饰: 删除线 */
    text-decoration: line-through;  /* 下划线: underline; 上划线: overline */

    /* 首行缩进 */
    text-indent: 20px;

    /* 字母大小写: 单词首字母大写 */
    text-transform: capitalize;  /* lowercase uppercase capitalize */

    /* 字符间距 */
    letter-spacing: 1px;

    /* 英文单词间距 */
    word-spacing: 10px;

    /* 文本超出后不换行 */
    white-space: nowrap;
    overflow: hidden; /* 隐藏溢出滚动 */
    text-overflow: ellipsis;  /* 省略号 */

    color: black;
}
```

https://blog.csdn.net/weixin_43331963/article/details/106784229