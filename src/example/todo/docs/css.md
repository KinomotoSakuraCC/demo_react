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

### 弹性布局

#### example

```jsx
import React from "react";
import './index.css';

export const App = () => {
    return (
        <>
            <div className='father' style={{backgroundColor: 'antiquewhite'}}>
                <span className='left-label' style={{color: "black"}}>{"label"}</span>
                <div className='right-div'>
                    <span className='text' style={{color: "black"}}>{"message1234567890"}</span>
                    <input className='input' style={{backgroundColor: 'white', borderWidth: 0, height: '80%'}}
                           type='text' placeholder='please enter...'/>
                </div>
            </div>
        </>
    )
}
```



```css
.father {
    display: flex;
    width: 400px;
    height: 200px;


    justify-content: space-between;
    align-items: center;

    .left-label {
        width: 100px;
    }

    .right-div {
        width: 300px;
        height: 50px;
        border: 5px solid black;
        border-radius: 10px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .input {
            min-width: 200px;
            flex: 1 0 auto; /* 有剩余时自动放大 */
        }
    }
}
```

![image-20250513013934106](C:\Users\Sakur\AppData\Roaming\Typora\typora-user-images\image-20250513013934106.png)

#### flex

1. 弹性容器：父元素的display设置为flex或inline-flex，创建弹性容器；子元素成为弹性项目
2. 主轴与交叉轴：主轴（水平方向）、交叉轴（垂直方向）
3. 水平：justify-content
4. 垂直：align-items

```css
/* 以主轴水平方向从左往右为例 */
.father-box {
    display: flex;

    /* 主轴对齐方式 */
    justify-content: flex-start;
    /* flex-start | flex-end | center | space-between | space-around */
    /* 左对齐 | 右对齐 | 居中对齐 | 两端对齐 | 两侧间隔 */

    /* 交叉轴对齐方式 */
    align-items: stretch;
    /* flex-start | flex-end | center | baseline | stretch */
    /* 顶端对齐 | 底部对齐 | 居中对齐 | 基线对齐（第一行文字的底线） | 拉伸（auto或无高度则占满容器高度） */

    /* 主轴方向 */
    flex-direction: row;
    /* row | row-reverse | column | column-reverse */
    /* 从左往右 | 从右往左 | 从上往下 | 从下往上 */

    /* 换行 */
    flex-wrap: nowrap;
    /* nowrap | wrap | wrap-reverse */
    /* 不换行 | 换行 | 反向换行（第一行在底部） */
    /* flex-flow: row nowrap; */
}

/* 子元素 */
.child-box {
    /* 排列顺序，默认0，小值优先 */
    order: 0;

    /* 项目放大比例，默认0，存在剩余也不放大 */
    flex-grow: 1; /* 所有项目设置1，等分剩余空间 */

    /* 项目缩小比例，默认1，空间不足时缩小 */
    flex-shrink: 0; /* 仅当前设置0，空间不足也不会缩小 */

    /* 项目占据空间，默认auto，项目本来的宽度 */
    flex-basis: auto; /* 100px | 50% | 10em | 10rem | 10vw | 10vh */

    /* flex简写 */
    /* flex: 0 1 auto; 默认 */
    /* flex: 1 1 auto; （auto） */
    /* flex: 0 0 auto; （none） */

    /* 子元素的独特对齐方式，覆盖父元素的align-items */
    align-self: center;
    /* auto | flex-start | flex-end | center | baseline | stretch */
    /* auto: 继承父元素的align-items */
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
.son-absolute-element {
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
.custom-text {
    color: black;
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
    white-space: nowrap;  /* 超出不换行 */
    overflow: hidden;
    
}

/* 鼠标悬浮 :hover */
.custom-text:hover {
    color: blue;
    text-decoration: underline;
    /* 设置光标形状 */
    cursor: pointer;  /* 手形光标 */
}
```



#### 字体及文本属性

```css
.text {
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

