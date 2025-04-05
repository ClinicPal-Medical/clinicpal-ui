import React from "react";

function Logo({
  width = "41.000000pt",
  height = "42.500000pt",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 88.000000 84.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        width={width}
        height={height}
        x="11"
        y="10.5"
        rx="10"
        ry="10"
        fill="var(--primary)"
      ></rect>
      <g
        transform="translate(0.000000,84.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M404 572 c-16 -11 -34 -48 -34 -71 0 -15 -7 -21 -22 -22 -81 -5 -98
-19 -98 -80 0 -46 27 -69 82 -69 36 0 38 -1 38 -34 0 -53 28 -80 81 -78 52 2
69 20 69 73 l0 36 52 5 c58 6 78 24 78 73 0 49 -20 67 -78 73 -51 4 -52 5 -52
38 0 18 -7 40 -16 48 -16 16 -80 22 -100 8z m80 -18 c11 -4 16 -19 16 -50 l0
-44 55 0 c63 0 78 -15 66 -70 -7 -35 -7 -35 -61 -36 l-55 -1 -5 -54 -5 -54
-45 0 -45 0 -3 55 -3 55 -59 -3 c-56 -4 -60 -2 -65 21 -4 13 -5 38 -3 53 3 28
5 29 66 32 l62 3 0 43 c0 23 3 46 7 49 8 9 56 9 77 1z"
          fill="white"
        />
      </g>
    </svg>
  );
}

export default Logo;
