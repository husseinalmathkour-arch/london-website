export default function Logo() {
  return (
    <svg
      viewBox="0 0 380 100"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-auto"
      aria-label="London Language Academy"
    >
      {/* Shield — classic heraldic shape */}
      {/* Shield — wider, less tall */}
      <path
        d="M 5,10 L 75,10 L 75,52 C 75,65 40,74 40,74 C 40,74 5,65 5,52 Z"
        fill="#c3ab73"
      />

      {/* L inside shield */}
      <text
        x="40"
        y="60"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="44"
        fill="#70212c"
        textAnchor="middle"
        fontWeight="bold"
      >
        L
      </text>

      {/* LONDON */}
      <text
        x="88"
        y="57"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="46"
        fill="#ffffff"
        fontWeight="bold"
      >
        LONDON
      </text>

      {/* LANGUAGE ACADEMY */}
      <text
        x="91"
        y="77"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="13"
        fill="#ffffff"
        letterSpacing="3.5"
      >
        LANGUAGE ACADEMY
      </text>
    </svg>
  )
}
