import { useAuthContext } from "../store/auth-context";

function Header() {
  const { token, logout } = useAuthContext();
  return (
    <header className="text-center text-stone-50 flex justify-between px-4">
      {token && (
        <>
          <h1 className="font-bold text-3xl font-mono">Image Generator</h1>
          <button
            className="mt-2 text-stone-300 hover:bg-stone-600 cursor-pointer bg-stone-500 rounded-lg p-2 shadow-md"
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
