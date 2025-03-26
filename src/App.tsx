import PasswordGenerator from "./components/PasswordGenerator";

export default function App() {
  return (
    <div className="container mx-auto mt-[200px]">
      <div className="w-[858px] h-[600px] bg-neutral-100 text-neutral-800 font-sans rounded-3xl shadow py-16 px-12 mx-auto">
        <PasswordGenerator />
      </div>
    </div>
  );
}
