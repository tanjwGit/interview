## 组件库中按需引用的原理
多npm包的原理


q-design-web 是基于q-design rn 组件库


<!-- - web 端 是使用 babel-plugin-import, 将直接引入的方式，通过babel转化成按需引入的方式;
```js
import { Button } from 'antd';
==>
import Button from 'antd/es/button';
import 'antd/es/button/style';
```
可通过 customName字段来自定义转换后的路径；
通过style字段，来自定义转换后的样式路径；

- tree shaking
如果组件库提供了es module版本，并开启了tree shaking，那么不需要babel-plugin-import，也可以达到按需加载的目的;
这个方法只针对于js， 对于样式的按需加载仍需要手动引入; -->