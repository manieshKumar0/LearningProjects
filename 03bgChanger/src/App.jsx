import { useState } from "react";
import "./App.css";

const HEX_REGEX = /^#([0-9A-Fa-f]{6})$/;

const PRESET_COLORS = [
  { name: "Sky Blue (Light)", hex: "#8ECAE6" },
  { name: "Blue Green", hex: "#219EBC" },
  { name: "Deep Space Blue", hex: "#023047" },
  { name: "Ink Black", hex: "#001219" },
  { name: "Dark Teal", hex: "#005F73" },
  { name: "Dark Cyan", hex: "#0A9396" },
  { name: "Pearl Aqua", hex: "#94D2BD" },
  { name: "Wheat", hex: "#E9D8A6" },
  { name: "Golden Orange", hex: "#EE9B00" },
  { name: "Blackberry Cream", hex: "#502F4C" },
  { name: "Dusty Lavender", hex: "#70587C" },
  { name: "Thistle", hex: "#C8B8DB" },
  { name: "Celadon", hex: "#95D5B2" },
  { name: "Mint Leaf", hex: "#74C69D" },
  { name: "Mint Leaf (Dark)", hex: "#52B788" },
  { name: "Sea Green", hex: "#40916C" },
  { name: "Hunter Green", hex: "#2D6A4F" },
  { name: "Pine Teal", hex: "#1B4332" },
];

function App() {
  const [bgColor, setBgColor] = useState(null);
  const [hex, setHex] = useState("#");

  const isValidHex = (value) => HEX_REGEX.test(value);

  const handlePresetColor = (color) => {
    setBgColor(color);
    setHex(color); // sync input with clicked color
  };

  const handleHexChange = (e) => {
    const value = e.target.value;

    if (!value.startsWith("#")) return;
    if (value.length > 7) return;

    setHex(value);
  };

  const applyHex = () => {
    if (!isValidHex(hex)) {
      alert("Invalid hex color");
      return;
    }
    setBgColor(hex);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center text-white`}
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <div className="text-center p-4">
        <h1 className="text-3xl font-bold">
          Background Color Changer
        </h1>
      </div>

      {/* Color Palette */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {PRESET_COLORS.map(({ name, hex }) => (
          <div
            key={hex}
            onClick={() => handlePresetColor(hex)}
            className="flex items-center gap-4 bg-white/80 text-black p-3 rounded-xl cursor-pointer hover:scale-[1.02] transition"
          >
            <div
              className="w-10 h-10 rounded"
              style={{ backgroundColor: hex }}
            />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600">{hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hex Input */}
      <div className="text-center p-6 flex flex-col items-center">
        <h3 className="mb-2">Enter Hex Color:</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            applyHex();
          }}
        >
          <input
            type="text"
            value={hex}
            onChange={handleHexChange}
            className="p-2 rounded text-black border border-gray-300"
          />
          <button
            type="submit"
            className="ml-2 bg-black px-4 py-2 rounded"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
