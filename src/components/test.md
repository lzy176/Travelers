[[toc]]

## 浏览器切换tab页setInterval失活
#### 问题详情
在页面中使用了setInterval计时去做一些效果，例如间隔100毫秒去创建一个元素，这个情况下，切换浏览器的tab页面，setInterval会被浏览器强制更改间隔时间，根据不同浏览器的规则，这个是不同的，谷歌是1秒钟，**如果你设置的间隔时间大于这个浏览器规定的强制时间，则不会被强制更改**
#### 解决方法
可以使用`visibilitychange`方法，监听页面的可见度，根据自己的需求进行操作，比如切换了，就暂停创建，回来了就恢复创建


## vue2中的methods配置的方法this指向与配置的不是同一个
```javascript
methods: {
	testFun() {
		this.testFun.change = function () {
			console.log('change');
		};
	},
	testFun2() {
		console.dir(this.testFun.change);
	},
},
```
#### 概况
大概是上边这个意思，就是在一个配置的方法中执行一些操作，返回一个函数，而这个返回的函数身上有一个自定义的方法，但是在同级配置的方法中去调用却会报错
#### 解释
`methods`中配置的方法，`this`调用的并不是你看到的那一个，而是经过bind方法重新生成的一个，所以自定义的方法是无效的


## vue3中的setup函数与setup语法糖
#### 区别
两者的区别在于编译后，setup语法糖会多出一个`expose`的方法，这个方法会单独导出所指定的数据，所以setup语法糖所写的组件在其他地方使用时，默认是获取不到任何东西的，而setup方法编译后没什么变化，也没有执行expose方法，所以会默认全部导出
#### 注意
因为setup方法会暴露组件所有的属性和方法，有可能会导致vue的单项数据流被破坏，所以在使用setup方法的时候，可以自行执行一下`defineExpose({test,test2})`这个方法，不用导入，这样组件在其他地方使用就没有可能调用其他不可控的属性及方法
