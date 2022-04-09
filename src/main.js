const $siteList = $(".siteList");
//   console.log($siteList);
const $lastLi = $siteList.find("li.last"); //找到网站列表里的最后一个li
const x = localStorage.getItem("x"); //从localStorage 中读出 x，此时 x 为字符串，需转化为对象

const xObject = JSON.parse(x); //把字符串重新变成对象

//hashMap的值，若xObject存在即为初始值，若不存在（第一次xObject为空值），即为默认数组
const hashMap = xObject || [
  //声明一个hash变量,parcel默认在代码外面加作用域，不能变成全局变量,就不用管全局污染了
  { logo: "A", url: "https://acfun.cn" },
  { logo: "B", url: "https://bilibili.com" },
  { logo: "M", url: "https://music.163.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 使用正则表达式选中 /开头的内容并删除
};

//渲染hashMap
const render = () => {
  $siteList.find("li:not(.last)").remove(); //找到siteList里除了最后一个li的所有li,删掉
  //遍历hashMap,forEach给两个参数，一个是当前元素，另一个是下标
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
    </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url); //打开一个新窗口，打开的地址为node.url
    });
    $li.on("click", ".close", (e) => {
      // console.log("这里");
      e.stopPropagation(); //阻止冒泡
      // console.log(hashMap);
      hashMap.splice(index, 1); //splice两个参数分别是删除位置以及删除个数
      render(); //删除后重新渲染
    });
  });
};
//注：整体结构就是首先渲染hashMap，click后，push到 siteList 里后再渲染一次
//先渲染hashMap
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  s;
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });

  //再次渲染hashMap
  render();

  //   const $li = $(`<li>
  //   <a href="${url}">
  //     <div class="site">
  //       <div class="logo">${url[0]}</div>
  //       <div class="link">${url}</div>
  //     </div>
  //   </a>
  // </li>`).insertBefore($lastLi); //在最后一个lastLi前面插入新的li
});
window.onbeforeunload = () => {
  //   console.log("页面要关闭了");
  const string = JSON.stringify(hashMap); //将对象变成字符串
  //   console.log(typeof hashMap);
  //   console.log(hashMap);
  //   console.log(typeof string);
  //   console.log(string);
  localStorage.setItem("x", string); //接收两个参数，一个key，一个value
};
$(document).on("keypress", (e) => {
  //const key = e.key;//若变量名和属性名一样可简写
  const { key } = e;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
