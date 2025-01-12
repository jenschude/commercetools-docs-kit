import * as React from 'react';

function SvgRibbon(props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="ribbon_svg__App-KIT-FInal"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="ribbon_svg__App-kit-/-3Colum-/--Component"
          transform="translate(-395 -640)"
          fill="#E6E6E6"
        >
          <g
            id="ribbon_svg__Component-/-icon-/-16px-/-bookmark"
            transform="translate(395 640)"
          >
            <path
              d="M12.322 2h-8.63C3.304 2 3 2.278 3 2.632v10.736c0 .227.138.442.36.555a.705.705 0 00.705-.038l3.942-2.4 3.928 2.413a.68.68 0 00.387.101.69.69 0 00.318-.076.636.636 0 00.36-.555V2.632c.013-.354-.29-.632-.678-.632z"
              id="ribbon_svg__Path"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgRibbon;
