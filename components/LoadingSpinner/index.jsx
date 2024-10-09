export default function LoadingSpinner() {
    return (
      <div className="flex  p-24  justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue3"></div>
      </div>
    );
  }