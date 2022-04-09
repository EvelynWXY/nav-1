const $siteList = $(".siteList"),
  $lastLi = $siteList.find("li.last"),
  x = localStorage.getItem("x"),
  xObject = JSON.parse(x),
  hashMap = xObject || [
    { logo: "A", url: "https://acfun.cn" },
    { logo: "B", url: "https://bilibili.com" },
    { logo: "M", url: "https://music.163.com" },
  ],
  simplifyUrl = (o) =>
    o
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, ""),
  render = () => {
    $siteList.find("li:not(.last)").remove(),
      hashMap.forEach((o, s) => {
        const e = $(
          `<li>\n    <div class="site">\n        <div class="logo">${
            o.logo
          }</div>\n        <div class="link">${simplifyUrl(
            o.url
          )}</div>\n        <div class="close">\n          <svg class="icon">\n            <use xlink:href="#icon-close"></use>\n          </svg>\n        </div>\n    </div>\n    </li>`
        ).insertBefore($lastLi);
        e.on("click", () => {
          window.open(o.url);
        }),
          e.on("click", ".close", (o) => {
            o.stopPropagation(), hashMap.splice(s, 1), render();
          });
      });
  };
render(),
  $(".addButton").on("click", () => {
    let o = window.prompt("请问你要添加的网址是啥？");
    0 !== o.indexOf("http") && (o = "https://" + o),
      console.log(o),
      hashMap.push({
        logo: simplifyUrl(o)[0].toUpperCase(),
        logoType: "text",
        url: o,
      }),
      render();
  }),
  (window.onbeforeunload = () => {
    const o = JSON.stringify(hashMap);
    localStorage.setItem("x", o);
  }),
  $(document).on("keypress", (o) => {
    const { key: s } = o;
    console.log(s);
    for (let o = 0; o < hashMap.length; o++)
      hashMap[o].logo.toLowerCase() === s && window.open(hashMap[o].url);
  });
//# sourceMappingURL=index.433cef41.js.map
