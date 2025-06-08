// https://21st.dev/react-bits/flowing-menu/default
import React from "react";
import { gsap } from "gsap";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number,
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    gsap.killTweensOf([marqueeRef.current, marqueeInnerRef.current]);
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );
    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" },
      0,
    );
  };

  const singleMarqueeSet = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="p-[1vh_1vw_0] text-[4vh] leading-[1.2] font-normal whitespace-nowrap text-neutral-900 uppercase dark:text-white">
          {text}
        </span>
        <div
          className="mx-[2vw] my-[1em] h-[7vh] w-[200px] shrink-0 rounded-[50px] bg-cover bg-center p-[1em_0]"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div
      className="relative flex-1 overflow-hidden text-center shadow-[0_-1px_0_0_rgba(255,255,255,0.2)] dark:shadow-[0_-1px_0_0_rgba(0,0,0,0.2)]"
      ref={itemRef}
    >
      <a
        className="relative flex h-full cursor-pointer items-center justify-center text-[4vh] font-semibold text-white uppercase no-underline hover:text-neutral-900 focus:text-white focus-visible:text-neutral-900 dark:text-neutral-900 dark:hover:text-white dark:focus:text-neutral-900 dark:focus-visible:text-white"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="pointer-events-none absolute top-0 left-0 h-full w-full translate-y-[101%] overflow-hidden bg-white dark:bg-neutral-900"
        ref={marqueeRef}
      >
        <div className="flex h-full w-full" ref={marqueeInnerRef}>
          <div className="animate-marquee relative flex h-full w-max items-center will-change-transform">
            <div className="flex shrink-0 items-center">{singleMarqueeSet}</div>
            <div className="flex shrink-0 items-center">{singleMarqueeSet}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="h-full w-full overflow-hidden bg-neutral-900 transition-colors duration-300 dark:bg-white">
      <nav className="m-0 flex h-full flex-col p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};
