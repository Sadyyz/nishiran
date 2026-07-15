export default function Seal({ ch, size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid #A3352A",
        color: "#A3352A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Shippori Mincho', serif",
        fontWeight: 700,
        fontSize: size * 0.42,
        flexShrink: 0,
        background: "rgba(163,53,42,0.06)",
      }}
    >
      {ch}
    </div>
  );
}
