###使用说明<br/>
1、参数 Object

| 参数名 | 类型 | 说明 | 可选值| 默认值 |
| :------| :------ | :------ | :------ | :------ |
| labelWidth | String | label宽度 | — | auto |
| options | Array | form表单选项 | — | — |
| optionValue | Object | form双向绑定值 | — | — |
| xs/sm/md/lg/xl | Number | 删格化 | 1--24 | 24 |

2、options

| 参数名 | 类型 | 说明 | 可选值| 默认值 |
| :------| :------ | :------ | :------ | :------ |
| label | String | label | — | — |
| type | String | 类型 |  | text |
| rules | Array | 规则,参考elementUi | — | — |
| rolling | Boolean | 是否回调 | true、false | false |
| selectItems | Array | select的options,参考elementUi | — | — |
| append | html/string/number | 在input后面添加内容，如：添加单位提示 | — | — |
| disabled | Boolean | 是否禁用 | true/false | false |
| isText | Boolean | 是否将input显示为文本 | true、false | false |

(1) type可选值：text、password、number、counter、select、multiple、textarea、date、dateTime、switch <br />
(2) type为number时如果先输入字母、文字，如果先输入数字，就不能输入字母文字了，所以要给rules验证 <br />
(3)注意：options参数类型Object，键需要和optionValue的键保持一致，如： 

```javascript
optionValue:{
  location: ''
}
options: {
  location: {}
}
```
