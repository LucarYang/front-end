# DOM
#### 1、DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。
#### 2、DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

节点的类型有七种。

* Document：整个文档树的顶层节点
* DocumentType：doctype标签（比如<！DOCTYPE html>）
* Element：网页的各种HTML标签
* Attr：网页元素的属性（比如class="right"）
* Text：标签之间或标签包含的文本
* Comment：注释
* DocumentFragment：文档的片段
  
#### 浏览器提供一个原生的节点对象Node，上面这七种节点都继承了Node，因此具有一些共同的属性和方法。

#### 3、节点树
第一个是文档类型节点（<!doctype html>），第二个是 HTML 网页的顶层容器标签<html>。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点
# Node接口
所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。
## Node属性
* Node.prototype.nodeType ：nodeType属性返回一个整数值，表示节点的类型。
* 