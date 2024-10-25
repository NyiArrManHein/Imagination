export default function Input({ id, label, value, type, controller }) {
  return (
    <div className="flex flex-col justify-start py-2 pr-2">
      <label htmlFor={id} className="label label-text">
        {label}
      </label>
      <input
        className="rounded-2xl border p-3 mt-1"
        id={id}
        type={type}
        name={id}
        value={value}
        placeholder={label}
        onChange={(e) => controller(e.currentTarget.value)}
      ></input>
    </div>
  );
}
