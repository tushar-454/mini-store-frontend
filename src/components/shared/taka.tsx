type TakaProps = {
  size?: number;
};

const Taka = ({ size = 20 }: TakaProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={size}
      height={size}
      x='0'
      y='0'
      viewBox='0 0 512 512'
      style={{ background: 'none', display: 'inline-block' }}
      xmlSpace='preserve'
      className=''
    >
      <g>
        <linearGradient
          id='a'
          x1='72.804'
          x2='369.777'
          y1='399.31'
          y2='102.327'
          gradientTransform='matrix(1 0 0 -1 0 511.19)'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#fde560'></stop>
          <stop offset='1' stopColor='#ff6f00'></stop>
        </linearGradient>
        <path
          fill='url(#a)'
          d='M198.4 72.3c7.9 11.6 15 30.3 15 57.9v89.6h23.9l40.1 40.9h-64v116c0 9.1 3.4 17.3 10.2 24.7s17.9 11.1 33.3 11.1c19.9 0 40.9-11.1 63.1-33.3 22.7-22.7 34.7-46 35.8-69.9l-10.2.9c-36.4 0-54.6-19.3-54.6-58 0-13.1 4.3-24.7 12.8-35 8.5-10.2 22.7-15.4 42.6-15.4 21 0 38.7 9.1 52.9 27.3 14.8 18.2 22.2 40.4 22.2 66.5 0 38.7-16.5 75.6-49.5 110.9-32.4 35.2-94.4 52.9-116 52.9-34.6 0-47.9-6.8-59.2-14.5-11.3-7.8-26.1-26.2-26.1-49.4V260.7h-40.9l-39.2-40.9h80.2v-81c0-18.1-18.1-28-29.9-29-7.2-.6-15.1 1.4-17.9 4.3-5.1-8.5-10-18.8-14.5-30.7 0 0 4-14.4 17.1-23 9-5.9 17.5-7.7 30.7-7.7 25.1-.1 36.7 11.7 42.1 19.6z'
          opacity='1'
          data-original='url(#a)'
          className=''
        ></path>
      </g>
    </svg>
  );
};

export { Taka };
