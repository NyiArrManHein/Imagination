export default function EmailTemplate({
  description,
  username,
  token,
  host,
  path,
  buttonValue,
}) {
  return (
    <div>
      <h1>
        Hello,{username},please click the following button {description}
      </h1>
      <button className="btn btn-error">
        <a href={"http://" + host + path + token}>{buttonValue}</a>
      </button>
    </div>
  );
}
