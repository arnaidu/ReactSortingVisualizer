function ChooseSort() {
  return (
    <>
      <article>
        <form>
          <div>
            <label>Input Array: </label>
            <input type="text"></input>
          </div>
          <div>
            <label htmlFor="sort"> Algorithm: </label>
            <select name="sort" id="sort">
              <option style={{ display: "none" }}></option>
              <option value="bubble">BubbleSort</option>
              <option value="merge">MergeSort</option>
              <option value="insert">Insertion Sort</option>
            </select>
          </div>

          <button className="btn">Sort</button>
        </form>
      </article>
      <section>
        <h1>hi</h1>
      </section>
    </>
  );
}

export default ChooseSort;
