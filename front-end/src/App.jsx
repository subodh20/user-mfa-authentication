import "./App.css";

function App() {
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("handleSignUp");
  };
  return (
    <div className="w-130 h-150 border-2 bg-sky-50 flex flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          className="border-2 border-sky-500 w-100 h-10 p-2 rounded-sm outline-0"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          className="border-2 border-sky-500 w-100 h-10 p-2 rounded-sm outline-0"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="mobile">Mobile:</label>
        <input
          name="mobile"
          type="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className="border-2 border-sky-500 w-100 h-10 p-2 rounded-sm outline-0"
        />
      </div>
      <button
        className="bg-sky-500 text-2xl text-white w-50 h-10 rounded-sm hover:bg-sky-600"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
}

export default App;
