//===================Main Loading Screen====================
export default function LoadingScreen() {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-black">
        <img
          src="/logo.png"
          alt="Loading..."
          className="w-48 h-48 md:w-64 md:h-64 animate-pulse"
        />
      </div>
    );
  }
  