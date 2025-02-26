import { useAuthContext } from "../store/auth-context";

function Header() {
  const { token, logout } = useAuthContext();
  return (
    <header className="text-center text-stone-50 flex justify-between px-4">
      {token && (
        <>
          <h1 className="font-bold text-3xl font-mono">Image Generator</h1>
          <button
            className="bg-[#CAFF00] text-[#151515] font-semibold py-2 px-4 rounded-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-400 cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
