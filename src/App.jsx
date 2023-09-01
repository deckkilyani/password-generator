import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let newPassword = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      newPassword += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(newPassword);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-gray-800 text-white min-h-screen pt-24 flex justify-center items-start">
      <div className="bg-gray-900 w-[600px] rounded-lg flex flex-col justify-center ">
        <h1 className="mt-8 text-4xl font-semibold text-center">
          Password Generator
        </h1>
        <div className="flex justify-center px-16 pt-8">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 px-2 rounded-l focus:outline-none text-black w-full border-none"
          />
          <button
            className="px-5 py-3 rounded-r bg-green-500"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center px-8 pt-8 pb-12 gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range" className="text-orange-500">
              Length&#40;{length}&#41;
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="numberInput"
              value={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label
              htmlFor="numberInput"
              className="text-orange-500 whitespace-nowrap"
            >
              Number Allowed
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="charInput"
              value={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label
              htmlFor="charInput"
              className="text-orange-500 whitespace-nowrap"
            >
              Character Allowed
            </label>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}/>
    </div>
  );
}

export default App;

