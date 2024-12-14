function Stat({ number, label }: { number: string, label: string }) {
    return (
      <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{number}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      </div>
    )
  }

export default Stat