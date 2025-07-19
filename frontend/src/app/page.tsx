import AuthSwitcher from "./components/AuthSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col gap-12 items-center">
        <div className="w-full max-w-sm p-8 rounded-xl shadow-lg bg-neutral-900 flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-green-500 text-center mb-2">
            Daisy
          </h1>
          <AuthSwitcher />
        </div>
        <p className="bg-black/70 rounded-lg p-4 text-center text-green-200 text-base font-medium shadow-inner mb-2">
          Create the super administrator. If you see this screen after creating
          the super administrator, there is a problem with the backend SQLite
          connection.
          <br /> Please check your configuration. If the issue persists, contact
          me at
          <span className="text-green-300 font-bold">
            {" "}
            meszarosricsi01@gmail.com
          </span>
        </p>
      </div>
    </div>
  );
}
