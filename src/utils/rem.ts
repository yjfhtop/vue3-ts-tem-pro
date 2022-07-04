// 这个是为了配合 postcss-px-to-viewport 来完成 最大版心的 处理方案。 没有版心需求可以去除
export default function remPlan(designW: number = 375, maxW: number = 750): void {
    let useW = Math.min(window.innerWidth, maxW);
    const html = document.getElementsByTagName('html')[0];
    let remSize = useW / 100;

    html.style.fontSize = `${remSize}px`;

    window.addEventListener('resize', () => {
        useW = Math.min(window.innerWidth, maxW);
        remSize = useW / 100;
        html.style.fontSize = `${remSize}px`;
    });
}
