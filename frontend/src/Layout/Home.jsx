export default function Home() {
  return (
    <div className="min-h-screen bg-indigo-100">
      <div className="flex gap-x-[1rem] min-h-fit mx-10 items-center pt-10">
        <label
          htmlFor="generateShortUrl"
          className="block text-xl font-medium text-gray-700 self-center"
        >
          Short Url Generator
        </label>

        <input
          id="generateShortUrl"
          name="generateShortUrl"
          type="text"
          placeholder="Enter the Url"
          required
          className="block min-w-min rounded-md bg-gray-200 px-2 py-2 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-xl"
        />

        <button
          type="submit"
          className="flex min-w-max justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Generate
        </button>
      </div>

      <div>{}</div>
    </div>
  );
}
