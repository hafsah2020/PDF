import React from 'react';

interface DeerLogoProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
  accentColor?: string;
  showText?: boolean;
  stacked?: boolean;
  customLogoUrl?: string;
  isWatermark?: boolean;
}

export const DeerLogo: React.FC<DeerLogoProps> = ({
  className = '',
  size = 64,
  monochrome = false,
  accentColor = '#0f172a',
  showText = true,
  stacked = true,
  customLogoUrl,
  isWatermark = false,
}) => {
  const primaryFill = monochrome ? 'currentColor' : accentColor;
  const darkFill = monochrome ? 'currentColor' : '#0f172a';
  const innerTextColor = isWatermark ? '#ffffff' : '#ffffff';
  const innerStrokeColor = isWatermark ? 'rgba(255, 255, 255, 0.9)' : '#ffffff';

  // If a custom uploaded logo exists, display it directly
  if (customLogoUrl) {
    return (
      <div className={`flex ${stacked ? 'flex-col' : 'flex-row'} items-center gap-2 select-none ${className}`}>
        <img
          src={customLogoUrl}
          alt="DEER Nigeria Logo"
          className="object-contain transition-transform duration-200"
          style={{ width: `${size}px`, maxHeight: `${size * 1.4}px` }}
          referrerPolicy="no-referrer"
        />
        {showText && !customLogoUrl.includes('logo') && !isWatermark && (
          <div className={`text-center ${stacked ? '' : 'text-left'}`}>
            <div className="font-extrabold tracking-[0.25em] text-slate-900 text-sm md:text-base uppercase">
              DEER NIGERIA
            </div>
            <div className="text-[10px] tracking-wider text-slate-500 uppercase font-medium">
              Staff Data Protection & Security
            </div>
          </div>
        )}
      </div>
    );
  }

  // Exact vector reproduction of the DEER NIGERIA emblem
  return (
    <div className={`flex ${stacked ? 'flex-col' : 'flex-row'} items-center gap-2 select-none ${className}`}>
      <svg
        width={size}
        height={size * 1.35}
        viewBox="0 0 260 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
      >
        {/* ================================================================= */}
        {/* ANTLERS - LEFT BRANCH */}
        {/* ================================================================= */}
        <g fill={darkFill}>
          {/* Main antler rack left side */}
          <path
            d="M 116 195 
               C 114 185, 106 172, 98 162 
               C 92 154, 88 142, 94 130 
               C 95 128, 96 125, 96 122 
               C 92 128, 86 136, 80 144 
               C 74 135, 68 122, 64 110 
               C 60 98, 54 85, 42 74 
               C 36 68, 28 62, 18 56 
               C 22 66, 30 76, 42 85 
               C 50 92, 58 102, 60 115 
               C 52 106, 42 98, 30 92 
               C 22 88, 16 86, 10 84 
               C 15 94, 25 106, 38 116 
               C 46 122, 52 132, 54 144 
               C 46 136, 36 130, 24 125 
               C 30 135, 40 145, 52 155 
               C 62 163, 74 170, 88 175 
               C 78 162, 68 148, 62 134 
               C 66 142, 72 150, 80 156 
               C 92 166, 104 178, 108 195 Z"
          />

          {/* Upper outer & inner tines left side */}
          <path
            d="M 68 95 
               C 58 78, 46 62, 30 46 
               C 28 54, 35 65, 44 76 
               C 50 83, 58 92, 64 102 
               C 62 86, 52 70, 40 56 
               C 46 62, 55 72, 62 84 Z"
          />

          {/* Top high curved main beam left side */}
          <path
            d="M 88 120 
               C 82 92, 75 64, 62 36 
               C 60 32, 58 28, 54 22 
               C 58 26, 64 34, 70 44 
               C 78 58, 84 74, 88 92 
               C 91 104, 94 115, 96 128 Z"
          />

          {/* Crown top inward hook tine left side */}
          <path
            d="M 54 22 
               C 58 14, 68 18, 72 26 
               C 70 32, 64 36, 60 32 Z"
          />
        </g>

        {/* ================================================================= */}
        {/* ANTLERS - RIGHT BRANCH (PERFECT SYMMETRICAL REFLECTION ACROSS X=130) */}
        {/* ================================================================= */}
        <g fill={darkFill} transform="translate(260, 0) scale(-1, 1)">
          {/* Main antler rack right side */}
          <path
            d="M 116 195 
               C 114 185, 106 172, 98 162 
               C 92 154, 88 142, 94 130 
               C 95 128, 96 125, 96 122 
               C 92 128, 86 136, 80 144 
               C 74 135, 68 122, 64 110 
               C 60 98, 54 85, 42 74 
               C 36 68, 28 62, 18 56 
               C 22 66, 30 76, 42 85 
               C 50 92, 58 102, 60 115 
               C 52 106, 42 98, 30 92 
               C 22 88, 16 86, 10 84 
               C 15 94, 25 106, 38 116 
               C 46 122, 52 132, 54 144 
               C 46 136, 36 130, 24 125 
               C 30 135, 40 145, 52 155 
               C 62 163, 74 170, 88 175 
               C 78 162, 68 148, 62 134 
               C 66 142, 72 150, 80 156 
               C 92 166, 104 178, 108 195 Z"
          />

          {/* Upper outer & inner tines right side */}
          <path
            d="M 68 95 
               C 58 78, 46 62, 30 46 
               C 28 54, 35 65, 44 76 
               C 50 83, 58 92, 64 102 
               C 62 86, 52 70, 40 56 
               C 46 62, 55 72, 62 84 Z"
          />

          {/* Top high curved main beam right side */}
          <path
            d="M 88 120 
               C 82 92, 75 64, 62 36 
               C 60 32, 58 28, 54 22 
               C 58 26, 64 34, 70 44 
               C 78 58, 84 74, 88 92 
               C 91 104, 94 115, 96 128 Z"
          />

          {/* Crown top inward hook tine right side */}
          <path
            d="M 54 22 
               C 58 14, 68 18, 72 26 
               C 70 32, 64 36, 60 32 Z"
          />
        </g>

        {/* Antler central forehead base bridge */}
        <path
          d="M 104 195 
             C 114 191, 122 186, 130 186 
             C 138 186, 146 191, 156 195 
             C 160 200, 152 206, 142 204 
             C 136 202, 130 196, 130 196 
             C 130 196, 124 202, 118 204 
             C 108 206, 100 200, 104 195 Z"
          fill={darkFill}
        />

        {/* ================================================================= */}
        {/* HERALDIC CARTOUCHE / PLAQUE */}
        {/* ================================================================= */}
        <g id="plaque-group">
          {/* Outer Plaque Shape with Scalloped / Inset Corners and Side Lobe Brackets */}
          <path
            d="M 38 204 
               C 38 196, 44 192, 54 192 
               L 206 192 
               C 216 192, 222 196, 222 204 
               C 229 208, 238 217, 238 228 
               C 238 239, 229 248, 222 252 
               C 222 260, 216 264, 206 264 
               L 54 264 
               C 44 264, 38 260, 38 252 
               C 31 248, 22 239, 22 228 
               C 22 217, 31 208, 38 204 Z"
            fill={darkFill}
            stroke={darkFill}
            strokeWidth="2"
          />

          {/* Inner Inset Contour Line */}
          <path
            d="M 42 208 
               C 42 202, 47 197, 55 197 
               L 205 197 
               C 213 197, 218 202, 218 208 
               C 224 212, 232 219, 232 228 
               C 232 237, 224 244, 218 248 
               C 218 254, 213 259, 205 259 
               L 55 259 
               C 47 259, 42 254, 42 248 
               C 36 244, 28 237, 28 228 
               C 28 219, 36 212, 42 208 Z"
            fill="none"
            stroke={innerStrokeColor}
            strokeWidth="1.5"
          />

          {/* DEER Text inside plaque */}
          <text
            x="130"
            y="239"
            textAnchor="middle"
            dominantBaseline="central"
            fill={innerTextColor}
            fontSize="34"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight="700"
            letterSpacing="8"
          >
            DEER
          </text>
        </g>

        {/* ================================================================= */}
        {/* NIGERIA TEXT BELOW PLAQUE */}
        {/* ================================================================= */}
        <text
          x="130"
          y="298"
          textAnchor="middle"
          fill={darkFill}
          fontSize="24"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontWeight="900"
          letterSpacing="4"
        >
          NIGERIA
        </text>
      </svg>

      {showText && !isWatermark && (
        <div className={`text-center ${stacked ? '' : 'text-left'}`}>
          <div className="text-[10px] tracking-wider text-slate-500 uppercase font-medium mt-0.5">
            Staff Data Protection & Security
          </div>
        </div>
      )}
    </div>
  );
};
