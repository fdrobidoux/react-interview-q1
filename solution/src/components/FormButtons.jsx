export default function FormButtons({ handleClear, handleAdd }) {
  const buttonClasses = "inline-block mx-4 border border-black px-2 border-b-3 border-r-3";

  return (
    <div className="text-right">
      <button className={buttonClasses} onClick={handleClear}>Clear</button>
      <button className={buttonClasses} onClick={handleAdd}>Add</button>
    </div>
  );
}