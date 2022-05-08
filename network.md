## UDP与TCP的区别
- UDP: 无连接、只发送数据, 不保证有序、不保证不丢失、无流量控制算法；
  - 面向无连接: 
    - 发送端: 应用层将数据传递到传输层的UDP协议, UPD只给数据添加一个UDP头标识, 就传递给网络层；
    - 接收端: 网络层将数据传递给传输层, UPD去除IP报文头, 就传递给应用层, 不进行拼接操作；
  - 不可靠性: 
    - 通信不建立连接
    - 不关心请求方是否正确接收到数据, 发完即止；
    - 没有拥塞控制, 以恒定速率发送（网络条件不好, 也不会对发送速率进行调整）, 可能导致丢包；
  - 高效: 
    - 头部开销小, 只有八字节（TCP为至少20字节）;
  - 传输方式: 支持 一对一, 多对多、多对一的方式, 即 单播、多播、广播；
  - 适用场景: 直播、高实时性游戏等;
- TCP: 需建立、断开连接, 通过各种算法保证数据的可靠性, 导致没有UDP高效；
  - 总结: 
    - 建立连接需要三次握手, 断开连接需要四次握手；
    - 滑动窗口解决了数据的丢包、顺序不对和流量控制问题；
    - 拥塞窗口实现了对流量的控制, 保证在全天候环境下最优的传递数据；

  - [详见TCP章节](https://www.xyhthink.com/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/26-TCP.htm)
  - 头部:  
  - 状态机: 与建立断开连接时的握手息息相关;
    - 三次握手:
    - 四次挥手:
  - ARQ 协议: 超时重传机制, 
    通过确认和超时机制保证了数据的正确送达, ARQ 协议包含停止等待 ARQ 和连续 ARQ 两种协议。
  - 滑动窗口: 两端其实都维护着窗口: 分别为发送端窗口和接收端窗口。
  - 拥塞处理: 作用于网络, 防止过多的数据拥塞网络, 避免出现网络负载过大的情况;
    - 慢开始算法: 传输开始时将发送窗口慢慢指数级扩大, 从而避免一开始就传输大量数据导致网络拥塞。
    - 拥塞避免算法:
    - 快速重传:

## 为什么 TCP 建立连接需要三次握手, 明明两次就可以建立起连接?
  - 为了防止出现失效的连接请求报文段被服务端接收的情况, 从而产生错误

## 说一说HTTP协议
  - 总结:
    - HTTP: 请求方法、首部的作用以及状态码的含义;
    - TLS: 两种加密方式以及握手的流程;
  - [详见HTTP协议部分](https://www.xyhthink.com/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/27-HTTP%20%E5%8F%8A%20TLS.htm)

  - 构成: 三部分
    - 请求行: `GET /images/logo.gif HTTP/1.1`
      - 请求方法:
      - URL:
      - 协议版本:
    - 首部: 两种(请求首部和响应首部), 部分首部可通用;
      - 通用首部:
      - 请求首部:
      - 响应首部:
      - 实体首部:

    - 实体:
  - 常见状态码:

  - TLS: HTTPS 还是通过了 HTTP 来传输信息, 但是信息通过 TLS 协议进行了加密;  
    TLS 协议位于传输层之上, 应用层之下; 使用了两种加密技术, 分别为: 对称加密和非对称加密。
    - 对称加密: 
      - 两边拥有相同的秘钥, 两边都知道如何将密文加密解密;
      - 但存在密钥被截获的问题;
    - 非对称加密: 
      - 分为公钥私钥
      - 将数据用公钥加密, 使用私钥解密;
      - 先使用非对称加密交换秘钥, 流程:
        1. 服务端创建 公私钥, 公布公钥;
        2. 客户端创建密钥, 通过公钥加密并送给服务端;
        3. 服务端通过私钥解密 密文 中的 密钥;

## HTTP2 及 HTTP3
  - HTTP2
    - 多路复用技术(复用建立的TCP连接) 可以只通过一个 TCP 连接就可以传输所有的请求数据:
      - 解决了浏览器限制同一个域名下的请求数量的问题;
      - 更容易实现全速传输,(因为一个TCP连接的拥塞控制存在慢开始算法)

      - HTTP/2 中, 有两个非常重要的概念, 分别是帧（frame）和流（stream)
        - 帧代表着最小的数据单位, 每个帧会标识出该帧属于哪个流, 流也就是多个帧组成的数据流。
        - 多路复用就是在一个 TCP 连接中可以存在多条流。 即多个请求;
        - 对端可以通过帧中的标识知道属于哪个请求; 避免 HTTP 旧版本中的队头阻塞问题, 极大的提高传输性能。

    - 二进制传输: 加强性能的核心点
      - HTTP/1/1.1 是通过文本的方式传输数据,
      - HTTP/2 中引入了新的编码机制, 传输的数据都会被分割, 并采用二进制格式编码

    - Header 压缩
      -  HTTP/1 使用文本的形式传输 header, 如果携带 cookie , 每次都需要重复传输几百到几千的字节;
      - 在 HTTP /2 中
        - 使用了 HPACK 压缩格式对传输的 header 进行编码, 减少了 header 的大小;
        - 并在两端维护了索引表, 用于记录出现过的 header,后续在传输过程中可以只传输记录过的 header 的键名, 对端收到数据后就可以通过键名找到对应的值
    - 服务端 Push
      - 服务端可以在客户端某个请求后, 主动推送其他资源
  - HTTP/3 底层支撑协议为 QUIC;
    - 解决了 HTTP/2 使用多路复用时, 一个域名只建立一个TCP连接, 如果出现丢包, 会导致 性能表现 不如 HTTP/1;
    - QUIC: 基于 UDP 协议;
      - 多路复用: 
      - 0-RTT:
      - 纠错机制:

## Post 和 Get 的区别？
  - get 请求可以缓存, Post 不能;
  - Post 请求相对安全一点; 因为 get 请求包含在URL里, 但两者都可以被抓包；
  - 浏览器对URL有长度限制, 影响get请求;
  - Post 支持更多的编码类型, 且不现实数据类型;

## 为什么 HTTP/2  出现丢包时, 会导致的表现情况反倒不如 HTTP/1 ？
  - 出现丢包的情况时, 整个 TCP 都要开始等待重传, 导致了后面的所有数据都被阻塞;
  - 为了解决此问题, 出现了基于 UDP 协议的 QUIC 协议;

## 跨域
- 同源策略: 协议、域名、端口、
受浏览器的同源策略影响, 防止 CSRF 攻击；

请求必然是发出去了, 但是浏览器拦截了响应;

- 解决方案
  - JSONP: 利用 `<script>` 标签没有跨域限制的漏洞; 但只限get请求;
    ```html
    <script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
    <script>
        function jsonp(data) {
          console.log(data)
      }
    </script>
    ```
  - CORS

    CORS 需要浏览器和后端同时支持; 浏览器会自动进行 CORS 通信, 实现 CORS 通信的关键是后端。只要后端实现了 CORS, 就实现了跨域;  
    服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS;

    CORS 有两种情况: 简单请求 和 复杂请求

    - 简单请求: 
      - 请求类型: GET、HEAD、POST
      - Content-Type 的取值: text/plain、multipart/form-data、application/x-www-from-urlencoded;
    - 复杂请求: 
      - 复杂请求首先会发起一个预检请求, 该请求是 option 方法的, 通过该请求来知道服务端是否允许跨域请求;

  - document.domain
    - 该方式只能用于二级域名相同的情况下;
    只需要给页面添加 document.domain = '二级域名', 表示二级域名都相同就可以实现跨域

  - postMessage
    - 通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息, 另一个页面判断来源并接收消息
      ```js
      window.parent.postMessage('message', 'http://test.com')
      // 接收消息端
      var mc = new MessageChannel()
      mc.addEventListener('message', event => {
        var origin = event.origin || event.originalEvent.origin
        if (origin === 'http://test.com') {
          console.log('验证通过')
        }
      })
      ```


## 浏览器缓存 与网络缓存
- 缓存位置: 5个
  - Service Worker
  - Memory Cache
  - Disk Cache
  - Push Cache
  - 网络请求
- Service Worker: 可以自由控制缓存哪些文件、并且缓存是持续性的；没有命中时, 需要调用fetch函数获取数据;
- Memory Cache( [ˈmem(ə)ri] ): 内存中的缓存, 持续性很短, 会随着进程的释放而释放;
- Disk Cache ([dɪsk] ): 存储在硬盘中的缓存, 读取速度慢, 根据 HTTP Herder 中的字段判断哪些资源需要缓存, 哪些资源可以不请求直接使用, 哪些资源已经过期需要重新请求；
- Push Cache: HTTP/2 中的内容, 当以上三种缓存都没有命中时, 就会被使用;  
  缓存时间也很短暂, 只在会话（Session）中存在, 一旦会话结束(连接被关闭)就被释放;

- 缓存策略: 强缓存 协商缓存, 通过设置 HTTP Header 来实现的。
  - 强缓存: 设置两种 HTTP Header 实现, 在缓存期间不需要请求, state code 为 200;
    - expires ([ɪkˈspaɪr] 医科 斯拜尔): `Expires: Wed, 22 Oct 2018 08:41:00 GMT`
      http/1产物, 表示在 `Wed, 22 Oct 2018 08:41:00 GMT` 后过期, 是与本地时间对比, 如果修改了本地时间, 缓存会不准确；
    - cache-control（[kənˈtroʊl] 肯 抽）: `Cache-control: max-age=30`;
       HTTP/1.1, 优先级高于 Expires, 表示多长时间后过期;
       - 常见指令的作用  

          | 指令 | 作用 |  
          | --- | --- |
          |public|响应可以背客户端和代理服务器缓存|
          |private|响应只能被客户端缓存|
          |max-age=30|缓存30s后过期, 需重新请求|
          |s-maxage=30|与max-age作用相同, 在代理服务器中生效|
          |no-store|不缓存任何响应|
          |no-cache|资源被缓存, 但立即失效, 下次会发起请求验证资源是否过期|
          |max-stale=30|30s内, 缓存过期, 也要使用|
          |min-fresh=30|希望在30s内获取最新响应|

  - 协商缓存: 设置两种 HTTP Header 实现, Last-Modified 和 ETag;
    发起验证资源, 如果没有改变, 会返回304,并更新缓存有效期；
    - Last-modified 和 If-Modified-Since:
      Last-modified 是本地文件的最后修改日期, If-Modified-Since 会将 Last-modified 发送给服务器；
      - Last-modified 两种弊端: 
        - 本地只有打开缓存文件, 就会导致 Last-modified 被修改, 导致不能命中缓存;
        - Last-modified 以秒计算, 如果在小于1s的时间内修改文件, 服务端会认为资源没有修改;
    - ETag 和 If-None-Match: http/1.1, 解决了Last-modified的问题;
      Etag 类似于文件指纹, If-None-Match 会将Etag发给服务器, 询问Etag是否有变动, 优先级比 last-Modified高;
  - 实际场景: 
    频繁变动的资源: Cache-Control: no-cache, 使浏览器每次都请求服务器, 配合ETag 或者 Last-Modified 来验证资源是否有效；
    代码文件: 对打包出的文件名进行哈希处理, Cache-Control: max-age=31536000（设置一个较长的有效期）, 只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件, 否则就一直使用缓存。




## 存储
- cookie, localStorage, sessionStorage, indexDB、Service Worker

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

| 特性 | cookie | localStorage | sessionStorage | indexDB | 
| ---- | ---- | ---- | ---- | ---- |
|数据生命周期 | 一般由服务器生成, 可以设置过期时间 | 除非被清理, 否则一直存在 | 页面关闭就清理 | 除非被清理, 否则一直存在 |
|数据存储大小 | 4K | 5M | 5M	｜无限 |
|与服务端通信 | 每次都会携带在 header 中, 对于请求性能影响 | 不参与	｜不参与 | 不参与 |

- cookie 不建议用于存储, 要注意安全性

- Service Worker:  是运行在浏览器背后的独立线程, 一般可以用来实现缓存功能；但传输协议必须为 HTTPS；  
因为 Service Worker 中涉及到请求拦截, 所以必须使用 HTTPS 协议来保障安全。
